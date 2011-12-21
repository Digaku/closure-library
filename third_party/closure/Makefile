


all: goog/deps.js mt/deps.js

goog/deps.js:
	echo "var goog = goog || {}; // dummy." > /tmp/base.js && \
	mv goog/base.js goog/base.backup.js && \
	mv /tmp/base.js goog/base.js && \
	python /Users/Robin/Development/closure-build-tools/genjsdeps.py goog && \
	echo "/* third party */" > /tmp/deps1.js && \
	tail +5 $@ >> /tmp/deps1.js && \
	sed 's|goog.addDependency("|goog.addDependency("../../third_party/closure/goog/|g' /tmp/deps1.js > /tmp/deps2.js && \
	mv /tmp/deps2.js $@ && \
	rm goog/base.js && \
	mv goog/base.backup.js goog/base.js


mt/deps.js:
	echo "var goog = goog || {}; // dummy." > /tmp/base.js && \
	mv mt/base.js mt/base.backup.js && \
	mv /tmp/base.js mt/base.js && \
	python /Users/Robin/Development/closure-build-tools/genjsdeps.py mt && \
	echo "/* third party */" > /tmp/deps1.js && \
	tail +5 $@ >> /tmp/deps1.js && \
	sed 's|goog.addDependency("|goog.addDependency("../../third_party/closure/mt/|g' /tmp/deps1.js > /tmp/deps2.js && \
	mv /tmp/deps2.js $@ && \
	rm mt/base.js && \
	mv mt/base.backup.js mt/base.js


.PHONY: goog/deps.js mt/deps.js