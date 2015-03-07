//字符串插入","
var gval = parseInt($("#result-number").data("number"));
gval = parseInt((gval - Math.random()*100));

gvalString = gval.toString();

var long = gvalString.length;
var mo = long%3 - 1;

var string = '';
for (var i = 0;  i<long ; i++) {
  string += gvalString.charAt(i);

  if (i == (mo)) {
    string += ',';
  }

  if (((i - mo)>0) && ((i - mo)%3) == 0 && (i<(long-1))) {
    string += ',';
  }                        
}