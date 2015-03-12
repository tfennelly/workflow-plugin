/*
 * The MIT License
 *
 * Copyright (c) 2013-2014, CloudBees, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.jenkinsci.plugins.workflow.support.steps;

import com.google.inject.Inject;
import hudson.EnvVars;
import org.jenkinsci.plugins.workflow.actions.EnvLogMasksAction;
import org.jenkinsci.plugins.workflow.graph.FlowNode;
import org.jenkinsci.plugins.workflow.steps.AbstractStepExecutionImpl;
import org.jenkinsci.plugins.workflow.steps.BodyExecution;
import org.jenkinsci.plugins.workflow.steps.BodyExecutionCallback;
import org.jenkinsci.plugins.workflow.steps.StepContext;
import org.jenkinsci.plugins.workflow.steps.StepContextParameter;

import java.util.HashSet;
import java.util.Set;

/**
 * @author <a href="mailto:tom.fennelly@gmail.com">tom.fennelly@gmail.com</a>
 */
public class EnvLogMasksStepExecution extends AbstractStepExecutionImpl {

    @Inject(optional=true)
    private transient EnvLogMasksStep step;

    @StepContextParameter
    private transient FlowNode flowNode;

    @StepContextParameter
    private transient EnvVars env;

    private BodyExecution body;

    @Override
    public boolean start() throws Exception {
        EnvLogMasksAction masksAction = EnvLogMasksAction.mapEnvVars(env, step.envVariableNames, flowNode);
        body = getContext().newBodyInvoker()
                .withCallback(new Callback(masksAction))
                .withDisplayName(null)
                .start();
        return false;
    }

    @Override
    public void stop(Throwable cause) throws Exception {
        if (body!=null) {
            body.cancel(cause);
        }
    }

    private static final class Callback extends BodyExecutionCallback {

        private final EnvLogMasksAction masksAction;

        public Callback(EnvLogMasksAction masksAction) {
            this.masksAction = masksAction;
        }

        @Override public void onSuccess(StepContext context, Object result) {
            clearMasks();
            context.onSuccess(result);
        }

        @Override public void onFailure(StepContext context, Throwable t) {
            clearMasks();
            context.onFailure(t);
        }

        private void clearMasks() {
            masksAction.getMaskProperties().clear();
        }
    }

    private static final long serialVersionUID = 1L;

}
