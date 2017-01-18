var entry = [];
var history1 = [];
var oper = false;
var disp = document.getElementById("display");
var history2 = document.getElementById("history");
var fresh = true;
var operators = /[+*\/-]/;
var operators1 = /[+*\/]/;

function backspace(){
  entry.pop();
  if (entry.length===0){
    disp.textContent = 0;
  } else {
  disp.textContent = entry.join('');
  }}
function clearsome(){
   entry=[];  
  disp.textContent = 0;
   fresh = true;
  oper=false;
}
function clearAll(){
  entry=[];  
  disp.textContent = 0;
  history2.textContent = "";
  fresh = true;
  oper=false;
}
/* function showHistory(){
 console.log(history2.textContent)
} */ //adding this function in when i can figure it out

function calculate(){
  var calced = Math.round(eval(entry.join(''))*10000, 100)/10000;
  var histNode = document.createElement('li');
  // for future functionality // histNode.setAttribute(onclick, showHistory());
  histNode.textContent = entry.join('') + ' = ' + calced;

    if (history2.childNodes.length>4){ //prevents overflow
      history2.removeChild(history2.childNodes[4]);
      }
   
  history2.insertBefore(histNode, history2.childNodes[0]);
  entry = [calced];
  fresh = false;
  disp.textContent = entry;
  }

function setinputvar(){
  var b = event.which;
  if (b===13){
    return calculate();
  } else {
    b = String.fromCharCode(b);
    var valid = /[0-9+\-/*.]/;
    b= b.match(valid);
   if (b !== null){
    return input(b);
  }            }
}

function input(a){
 if (!fresh){
   if (!isNaN(a) || a=="."){
     entry = [a];
     } //restarts with new number if first number pushed after = is a number (or decimal point)
  else {entry.push(a);
         disp.textContent = entry.join(''); }
         fresh = true; //otherwise, applies operator to previous value
 } else { //then this is the main section
  if (entry.length<1){
    var cats = a.toString();
    var rats = cats.match(operators1);
    if (rats=== null){
     entry.push(a); //makes sure first input is not an operator
   } else { return;}
   } else {
     if (oper){
     if (a.toString().match(operators)!==null){
        entry.splice(-1, 1, a); //prevents multiple operators from being entered consecutively, just replacing with new one. not how to deal with multiple decimal points
       } else {
         entry.push(a);
         oper=false; 
       }
     } else {
       entry.push(a); //normal case. just adds it to the calculation
     }  
   }
   }
    disp.textContent = entry.join(''); //sets the display

      if (isNaN(a)){
     if (a !=="-" || a!==".") 
      oper=true; //this watches for when non-numbers are pressed for the splice above
    }
}