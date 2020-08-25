class accordion{
  constructor(data,opt){
    opt = opt || {};
    //Main contaimer
    opt.name = opt.name || Math.floor(100000*Math.random());
    opt.oneatthetime = opt.oneatthetime || false;
    this.name = name;
    function hidenext(item,chvisi){
      if(item != undefined){
        if(chvisi){
          // item.style.height = "auto"
          // item.style.visibility = "visible"
          item.classList.remove("hiddenitem");
        }
        else{
          // item.style.height = "0px"
          // item.style.visibility = "hidden"
          item.classList.add("hiddenitem");
        }
        if(!chvisi){
          Array.from(item.children).forEach((iteme) => {
            if(iteme.arrow != undefined){
              iteme.arrow.style.transform = chvisi?"rotate(90deg)translateY(-2px)scale(1.5)":"translateY(-2px)scale(1.5)";
            }
            iteme.childrenvisible = false;
            hidenext(iteme.next,chvisi)
          });
        }

      }
    }
    this.opt = opt;
    function addsublevelRec(parent,data,rownum){

      var elt = document.createElement('ul')
      elt.classList.add("accordionsublevelul");
      elt.classList.add("accordionsublevelul_"+rownum);
      // elt.style.listType = "none";
      // elt.style.paddingLeft = "0";
      // elt.style.transition= "height ease-out 0.3s";
      if(rownum>0){
        elt.classList.add("hiddenitem")
        // elt.style.visibility = "hidden";
        // elt.style.height = "0px";
      }

      if(data != undefined){
        for(var toto of data){
          console.log(toto,data)
          var lit = document.createElement('li');
          var a = document.createElement('a');

          lit.appendChild(a)
          var arrow = document.createElement('span');
          arrow.innerHTML = "›";
          a.innerHTML = toto.text;
          arrow.style.fontFamily = "serif";
          lit.arrow = arrow;
          if(!(toto.next == undefined || toto.next.length == 0)){

            lit.appendChild(arrow)
          }
          var graycol = (1-(Math.exp(-rownum/3)))*255;
          lit.style.cssText = "cursor:pointer;background:rgb("+graycol+","+graycol+","+graycol+");padding:"+(Math.exp(-rownum/2)*10)+"px;border-bottom:0px solid white;color:white;list-type:none;"
          a.style.cssText = "padding-left:"+1.2*rownum+"em;padding-right:5px;"
          arrow.style.position = "absolute";
          arrow.style.right = "8px";
          arrow.style.transform = "scale(1.5)";
          arrow.style.transformOrigin = "right center";

          if(toto.click != undefined){
            lit.addEventListener('click',toto.click)
          }

          if(toto.next != undefined){
            lit.childrenvisible = false;
            lit.addEventListener('click',function(){

              var childList = Array.from(this.next.children)
              this.childrenvisible = !this.childrenvisible

              var chvisi = this.childrenvisible
              this.arrow.style.transform = chvisi?"rotate(90deg)translateX(5px)scale(1.5)":"scale(1.5)";
              var item = this.next;
              hidenext(this.next,chvisi)
              // childList.forEach(function(item){
              //   if(chvisi){
              //     item.style.height = "auto"
              //     item.style.visibility = "visible"
              //   }
              //   else{
              //     item.style.height = "0"
              //     item.style.visibility = "hidden"
              //   }
              //
              // });
            })
          }



          elt.appendChild(lit)
          var lit2 = addsublevelRec(lit,toto.next,rownum+1)
          lit.next = lit2;
          elt.appendChild(lit2)
        }
      }
      return(elt)
    }

    this.container = document.createElement('div');
    this.container.id = "accordioncontainer_"+name;
    this.container.classList.add("accordioncontainer");
    //this.container.style.cssText = "display:inline-flex;background:black;height:100%";
    this.containerUl = document.createElement('ul');
    this.containerUl.classList.add("accordioncontainerul");
    this.container.appendChild(this.containerUl);
    //this.containerUl.style.cssText = "margin:0px;background:#14661b;height:100%;padding:0px"
    this.containerUl.appendChild(addsublevelRec(this.containerUl,data,0));
    //document.body.appendChild(this.container)

  }

  width(){
    return(this.container.offsetWidth)
  }

  dom(){
    return(this.container)
  }


}

class helperview{
  constructor(){
    this.Dom = document.createElement('div');
    this.Dom.classList.add("herlperview0");
    var div2 = document.createElement('div');
    div2.classList.add("herlperview1");
    this.Dom.appendChild(div2);
    this.Dom.obj = this;
    this.Dom.addEventListener('click',function(){
      document.body.removeChild(this)
    })


    var Rect = document.getElementById("svg").getBoundingClientRect();
    this.h1 = document.createElement('img');
    this.h1.src = "./images/helper1.png";
    this.Dom.appendChild(this.h1);
    this.h1.style.cssText = "transform:translate(-50%,-120%);top:"+(Rect.y+Rect.height/2)+";left:"+(Rect.x+Rect.width/2)+";height:150px;position:absolute;"

    this.h2 = document.createElement('img');
    this.h2.src = "./images/helper2.png";
    this.Dom.appendChild(this.h2);
    console.log(A.width())
    this.h2.style.cssText = "transform:translate(3%,40%);top:"+(Rect.y)+";left:"+(A.width())+";height:150px;position:absolute;"

    document.body.appendChild(this.Dom);

  }
}



//A = new accordion([{text:'Interpolation of f\'(k)',next:[{text:'in S0'},{text:'in S1',next:[]}]},{text:'Interpolation of f(k) and f`(k)',next:[{text:'in 1D'},{text:'in 2D',next:[{text:'in S1+S2',next:[{text:'2211'},{text:'2212',click:()=>alert("toto"),next:[]}]}]}]}])
