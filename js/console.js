//class to add a console

class cle{
	constructor(parentid){
		var parent = document.getElementById(parentid)
		if(parent){
			var coco = document.createElement("div");
			coco.setAttribute("id",parentid+"console");
			coco.style.fontSize = "11px";
			coco.style.background = "white";
			parent.append(coco)
			this.dom = coco
			this.lines = [];
			this.addWrite()
		}
		else{
			console.error("No dom element found for the id "+parentid)
		}
	}

	addLine(Arrstr){
		str = Arrstr[0];
		this.lines.push(Arrstr);
		var popo = document.createElement("p");
		popo.innerHTML = "<span style=\"font-weight:bold;color:blue\">›</span><span>"+str+"</span>";
		//if(Arrstr.length == 1){popo.style.borderBottom ="0.5px solid #d4d4d4";}
		popo.style.paddingBottom ="2px";
		popo.style.margin ="0px";
		this.dom.append(popo)
		for(var i = 1;i<Arrstr.length;i++){
			var str = Arrstr[1];
			var popo = document.createElement("p");
			popo.innerHTML = str;
			//if(i == Arrstr.length-1){popo.style.borderBottom ="0.5px solid #d4d4d4";}
			popo.style.paddingBottom ="2px";
			popo.style.margin ="0px";
			this.dom.append(popo)
		}

		var geval = eval;
		var se = "";
		var col = "gray";
		try{
			se = geval(Arrstr.join("\n"))
		}
		catch(e){
			se = e;
			col ="red";
		}
		finally{
			var popo = document.createElement("p");
			popo.innerHTML = "<span style=\"font-weight:bold;color:"+col+"\">...</span><span>"+se+"</span>";
			popo.style.borderBottom ="0.5px solid #d4d4d4";
			popo.style.paddingBottom ="2px";
			popo.style.color=col;
			popo.style.margin ="0px";
			this.dom.append(popo)
		}
	}

	addWrite(str){
		if(this.writeLine){

		}
		else{
			var popo = document.createElement("p");
			popo.innerHTML = "<span style=\"font-weight:bold;color:blue\">›</span>";
			// popo.style.paddingBottom ="2px";
			// popo.style.margin ="0px";
			this.writeLine = popo;
			this.dom.append(popo);
			this.lineTmp = [];
			var toto = document.createElement("input");
			toto.style.border = "none";
			toto.style.width = "calc(100% - 30px)";
			toto.setAttribute('type','text');
			toto.addEventListener("focus", function () {
			  this.style.border = "none";
				this.style.boxShadow = "none";
				this.style.outline = "none";
			});
			popo.append(toto)
			var thistmp = this;
			popo.onkeypress = function(e){
		    if (!e) e = window.event;
		    var keyCode = e.keyCode || e.which;
		    if (keyCode == '13'){
					if(!e.shiftKey){
			      // Enter pressed
						thistmp.lineTmp.push(toto.value);
						console.log(thistmp.lineTmp.join("\n"))

			      thistmp.addLine(thistmp.lineTmp)
						toto.value = ""
						popo.remove()
						thistmp.writeLine = undefined
						thistmp.addWrite()
					}
					else{
						var titi = document.createElement("p");
						toto.style.border = "none";
						toto.style.width = "100%";
						toto.style.margin = "0.1px";
						titi.innerHTML = toto.value
						thistmp.lineTmp.push(toto.value);
						popo.insertBefore(titi,toto)
						toto.value = ""

						// popo.remove()
						// thistmp.writeLine = undefined
						// thistmp.addWrite()
					}
		    }
				else if(keyCode == '38'){
		    }
				else if(keyCode == '40'){
				}
		  }
		}
		setTimeout(function(){toto.focus();},0.1)
		// popo.innerHTML = "<span style=\"font-weight:bold;color:blue\">›</span> "+str;
		// popo.style.borderBottom ="0.5px solid #d4d4d4";
		// popo.style.paddingBottom ="2px";
		// popo.style.margin ="0px";
		// this.dom.append(popo)
	}
}

class cleline{

}
