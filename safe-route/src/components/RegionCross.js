import collect from '@turf/collect';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from '@turf/turf';

function intersect(point1,point2, polygon){


    
    var coordinate = turf.point([point2,point1]);
    console.log("Turf point = " + coordinate);
    // alert(coordinate);
    console.log("Polygon inside inteserct: "+ polygon[0])
     var poly = turf.polygon([polygon]);
     console.log("Turf poly = " + (poly));
    // alert("this is" + poly);

// var check = turf.booleanPointInPolygon(coordinate, poly)
    
    

    // if(check == true)
    // {
    //   //  console.log(data.features[1].Muniname(index));
    //     alert("its inside a polygon");
    // }
    // else alert("no");

}


export function regioncheck (instance){



 var result = instance.on('routeselected',function(e){
    const data = require('./GeoJSonOBJ.json');
    var data1 = JSON.stringify(data);
  //  console.log(data.features[1].properties.Muniname[0]);
 //   alert(data.features[0].geometry.coordinates[0]);
   
    
    // console.log("This is Polygon Features1:" + pol);
//console.log(data.features.length);
     // var coordarr = new Array();
      var allpoints = e.route;
      // alert(allpoints.coordinates[0].lat);
        for(let i = 0; i < allpoints.coordinates.length; i++)
        {
        
          var checklat = JSON.stringify(allpoints.coordinates[i].lat);
          var checklng = JSON.stringify(allpoints.coordinates[i].lng);
          var pair = ("["+checklat.concat(", ", checklng)+"]");
          //console.log(pair);
         // coordarr.push(new append(checklat, checklng));
            
            for (let j = 0; j < data.features.length; j++)
           {
           
            intersect(allpoints.coordinates[i].lat,allpoints.coordinates[i].lng,data.features[j].geometry.coordinates);
             
            }
        }
        //console.log(coordarr[0].lat);
    });

return(result);

}
