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

//A = new accordion([{text:'Interpolation of f\'(k)',next:[{text:'in S0'},{text:'in S1',next:[]}]},{text:'Interpolation of f(k) and f`(k)',next:[{text:'in 1D'},{text:'in 2D',next:[{text:'in S1+S2',next:[{text:'2211'},{text:'2212',click:()=>alert("toto"),next:[]}]}]}]}])
