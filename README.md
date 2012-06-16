
This code attempts to show the need for different approaches to load modules in Chrome Extension depending on
the context in which modules are used (starting from manifest_version 2).

The Packaged App/Extension context is subject to content_security_policy of the manifest. The extension/app has a document
and the module loader can write <script> tags to load javascript of the required module. (Approach 1)

In the Content Script context, the document object available is that of the web page to which this content script instance is attached.
Doing document.write('<script...') writes the script tag in the webpage's document and the script is loaded in the webpage's context.
As the content script's Javascript context is different from that of the web page, the module will not be available in content script.

Therefore the Content Script should load the required module by fetching code using XHR. (The manifest should have the
module file explicitly white-listed in web-accessible-content array as the content script is subjected to same origin policy
of the webpage, not the extension). After receiving the code over XHR, the loader should eval() the
code. (Approach 2)

We cannot use Approach 2 in the Packaged App or Extension context as eval() will not be available due to content_security_policy.
