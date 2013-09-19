var OK = OK || {};
OK.Covers = OK.Covers || [];

OK.Covers.Typography = {};

OK.Covers.Typography.formatAuthorName = function(name) {
  
  var author_out = new Array(["name", "normal"], ["surname", "normal"]);
  //console.log("current name: " + name);
  name = name.replace("  "," ");    
  var tokens = name.split(', ');
  if (tokens.length != 2) { tokens = name.split(" "); }
    
  var option = Math.round(Math.random()*6);
  
  //trim
  //tokens[0] = tokens[0].trim();
  //tokens[1] = tokens[1].trim();
    
  switch(option)
  {
          
  case 0:
  author_out[0][0] = tokens[0];
  author_out[1][0] = tokens[1];
  break;

  case 1:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[1][0] = tokens[1];
  break;
        
  case 2:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[1][0] = tokens[1].toUpperCase();
  break;
  
  case 3:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[0][1] = "bold";
  author_out[1][0] = tokens[1];
  break;
  
  case 4:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[1][0] = tokens[1];
  author_out[1][1] = "italic";
  break;
         
  case 5:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[0][1] = "bold";
  author_out[1][0] = tokens[1];
  author_out[1][1] = "italic"; 
  break;
  
  case 6:
  author_out[0][0] = tokens[0].toUpperCase();
  author_out[0][1] = "lighter";
  author_out[1][0] = tokens[1];
  author_out[1][1] = "bold"; 
  break;
          
  default:
  author_out[0][0] = tokens[0];
  author_out[1][0] = tokens[1];
          
  }
  return author_out;
};

OK.Covers.Typography.addLigatures = function(source_str, fontname) {
  
  var output_str = "";

  var mark = "left";
  //Polish quatation marks #x201E/#x201D outer, #xBB/#xAB inner
  source_str = source_str.replace(/\"/, String.fromCharCode(parseInt('201E', 16))); 
  source_str = source_str.replace(/\"/, String.fromCharCode(parseInt('201D', 16)));
  
    
  switch(fontname)
  {
        
   case "Varela":

   output_str = source_str.replace(/ff/g, String.fromCharCode(parseInt('fb00', 16)));
   output_str = output_str.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)));
   output_str = output_str.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)));
   output_str = output_str.replace(/ffi/g, String.fromCharCode(parseInt('fb03', 16)));
   output_str = output_str.replace(/ffl/g, String.fromCharCode(parseInt('fb04', 16))); 
   output_str = output_str.replace(/st/g, String.fromCharCode(parseInt('fb06', 16)));
   break;
          
   case "Andada":

   output_str = source_str.replace(/fi/g, String.fromCharCode(parseInt('fb01', 16)));
   output_str = output_str.replace(/fl/g, String.fromCharCode(parseInt('fb02', 16)));

   break;
          
   default:
   output_str = source_str;          
  }
  
  return output_str;
};
