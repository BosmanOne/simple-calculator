var counting = "";
var previous = "";
var previousWhole = "";
var canAddDot = true;

//BUTTON HANDLING
function buttonClick(button){
  var x = button.id;
 
  if (x == "AC"){
    allClear();
  }else if(x == "CE"){
    cancelEntry();
    
  }else if(x == "="){
    showResult();

  }else{
    check(x);
    printCounting();
  }
}
//BUTTON AC, CLEARS EVERYTHING
function allClear(){
   counting = "";
   previous = "";
   canAddDot = true;
   previousWhole = "";
   $(".display").html("0");
   $(".display2").html("0");
}
//BUTTON CE, CANCELS LAST ENTRY
function cancelEntry(){
  x = counting.length-1;
  if (counting[x] == "."){
    canAddDot = true;
  }
  if (counting[x] == "." && counting[x-1] == '0'){
    counting = counting.slice(0, x-1);
    previous = counting.slice(-1);
    previousWhole = previousWhole.slice(0, previousWhole.length-2);
  }else{
    counting = counting.slice(0, x);
    previous = counting.slice(-1);
    previousWhole = previousWhole.slice(0, previousWhole.length-1);
  }
  printCounting();
}
//ALL BUTTONS EXCEPT AC, CE AND EQUEAL
function check(x){
  if (x == '1' || x == '2' || x == '3' || x == '4' || x == '5' || x == '6' || x == '7' || x == '8' || x == '9'){
    if (counting == "0"){
      counting = x;
      previousWhole = x;
      previous = x;
    }else{
      counting += x;
      previousWhole += x;
      previous = x;
    }

  }
  else if (x == "0"){
    if (counting == "0" || (previousWhole[1] == 0) && previousWhole.length === 2){
     
    }else {
      counting += x;
      previousWhole += x;
      previous = x;
    }
  }
  else if (x == "."){
    if (canAddDot === true){
      if (previous == "" || previous == "-" || previous == "+" || previous == "÷" || previous == "x"){
        counting = counting +"0" +x;
        previousWhole = previousWhole +"0" +x; 
      } else {
        counting += x;
        previousWhole += x;
      }
      previous = x;
      canAddDot = false;
    }

  }
  else if (x == "+" || x == "-" || x == "÷" || x == "x"){
    if (counting != "" && (previous != "+" && previous != "-" && previous != "÷" && previous != "x")){
      counting += x;
      previous = x;
      canAddDot = true;
      previousWhole = x;
    }
  }
}
//PRINTING ON BOTH DISPLAYS THE COUNTINGS
function printCounting(){

  if (counting.length <= 34){
    $(".display2").html(counting);
  }else{
    $(".display2").html("ERROR: Limit reached")
  }
   
  if (previousWhole.toString().length <= 22){
      $(".display").html(previousWhole);
  }else{
     $(".display").html("ERROR: Limit reached")
  }

  if (counting == ""){
    $(".display2").html(0);
  }
  if (previousWhole == ""){
    $(".display").html(0);
  }
}
//CALCULATE THE RESULT, UPDATE VALUES COUNTING AND PREV.
function showResult(){
  counting = counting.replace(/x/gi, "*");
  counting = counting.replace(/÷/gi, "/");
  var result = (math.eval(counting));
  
  previous = counting.toString().slice(-1);
  previousWhole = result;
  //CHECKING IF CAN CLICK DOT BUTTON TO NEW RESULT.
  var dot = result.toString().indexOf(".");
  if (dot >= 0){
    canAddDot = false;
  }

  printCounting();
  counting = result;
}