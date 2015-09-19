var samples = {};

exports.getSample = function(sampleName) {
    var sample = samples[sampleName];
    if (sample) {
        return sample;
    } else {
        return '';
    }
};

samples.hello = "node {\n" +
    "   stage 'Stage 1'\n" +
    "   echo 'Hello World 1'\n" +
    "   stage 'Stage 2'\n" +
    "   echo 'Hello World 2'\n" +
    "}";

samples.maven = "node {\n" +
    "   // The 'stage' step lets you ....\n" +
    "   stage 'Checkout'\n" +
    "\n" +
    "   // Checkout some code from a github repository\n" +
    "   git url: 'https://github.com/jglick/simple-maven-project-with-tests.git'\n" +
    "\n" +
    "   // Get the maven tool (as installed in the global configuration)\n" +
    "   def mvnHome = tool 'M3'\n" +
    "\n" +
    "   stage 'Build'\n" +
    "   // Run the maven build\n" +
    "   sh \"${mvnHome}/bin/mvn clean install\"\n" +
    "}";