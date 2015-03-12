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
package org.jenkinsci.plugins.workflow.actions;

import hudson.EnvVars;
import hudson.model.InvisibleAction;
import org.jenkinsci.plugins.workflow.graph.FlowNode;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author <a href="mailto:tom.fennelly@gmail.com">tom.fennelly@gmail.com</a>
 */
public class EnvLogMasksAction extends InvisibleAction implements Serializable {

    private static final long serialVersionUID = 1L;

    private final Set<String> maskProperties;

    public EnvLogMasksAction(Set<String> maskProperties) {
        this.maskProperties = maskProperties;
    }

    public Set<String> getMaskProperties() {
        return maskProperties;
    }

    public static EnvLogMasksAction mapEnvVars(EnvVars env, Set<String> varsToMap, FlowNode toFlowNode) {
        // TODO: Not store env var values in the FlowNode
        Set<String> envVarVals = new HashSet<String>();
        for (String varName : varsToMap) {
            String envVarVal = env.get(varName);
            if (envVarVal != null) {
                envVarVals.add(envVarVal);
            }
        }
        EnvLogMasksAction masksAction = new EnvLogMasksAction(envVarVals);
        toFlowNode.addAction(masksAction);
        return masksAction;
    }
}
