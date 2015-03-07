/** 
* extend ifIE6
* @author cuki13
*/
function ie6() {
  var isIe6 = false;
  if (/msie/.test(navigator.userAgent.toLowerCase())) {
    if (jQuery.browser && jQuery.browser.version && jQuery.browser.version == '6.0') {
      isIe6 = true
    } else if (!$.support.leadingWhitespace) {
      isIe6 = true;
    }
  }
  return isIe6;
}