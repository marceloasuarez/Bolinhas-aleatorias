const palco=document.getElementById("palco")
const num_objetos=document.getElementById("num_objetos")
const txt_qtde=document.getElementById("txt_qtde")
const btn_add=document.getElementById("btn_add")
const btn_remover=document.getElementById("btn_remover")

let larguraPalco=palco.offsetWidth //pega largura do palco
let alturaPalco=palco.offsetHeight //pega ancho de la tela do palco
let bolas=[]
let numBola=0

class Bola{
	constructor(arrayBolas,palco){
		this.tam=Math.floor(Math.random()*10)+10 //tamanho da bolinha
		this.r=Math.floor(Math.random()*255) //cor r
		this.g=Math.floor(Math.random()*255) //cor g
		this.b=Math.floor(Math.random()*255) // cor b
		this.px=Math.floor(Math.random()*(larguraPalco-this.tam)) //si achica la tela exclui algumas bolinhas
		this.py=Math.floor(Math.random()*(alturaPalco-this.tam))
		this.velx=Math.floor(Math.random()*2)+0.5 //velocidade X
		this.vely=Math.floor(Math.random()*2)+0.5 //velocidade Y
		this.dirx=(Math.random()*10)>5?1:-1 //direcao X
		this.diry=(Math.random()*10)>5?1:-1 //direcao Y
		this.palco=palco
		this.arrayBolas=arrayBolas
		this.id=Date.now()+"_"+Math.floor(Math.random()*10000000000000) //tiene q agregar ese aleatorio para que no haya varios Datenow iguales, p q la creacion es muy rapida.
		this.desenhar() //desenha a bolinha do DOM
		this.controle=setInterval(this.controlar,10)
		this.eu=document.getElementById(this.id) //relaciona bolinha do DOM com bolinhas do Array
		numBola++
		num_objetos.innerHTML=numBola
		
	}
	minhapos=()=>{ //para saber la posicao das bolinhas 
		return this.arrayBolas.indexOf(this) //retorna posicao
	}
	
	remover=()=>{ //para remover bolinhas
		clearInterval(this.controle) //para a bolinha do domain
		bolas=bolas.filter((b)=>{ //excluimos a bolinha do container
			if(b.id!=this.id){
				return b
			}
		})
		this.eu.remove() //remove a bolinha do DOM
		numBola-- //resta o numero de bolas no display da tela
		num_objetos.innerHTML=numBola
	}
	
	desenhar=()=>{
		const div=document.createElement("div")
		div.setAttribute("id",this.id)
		div.setAttribute("class","bola")
		div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
		this.palco.appendChild(div)
	}

	controle_bordas=()=>{ //controla si las bolinhas coliciono con as bordas da tela
		if(this.px+this.tam >= larguraPalco){
		this.dirx=-1
		}else if(this.px <= 0){
		this.dirx=1
		}
		if(this.py+this.tam >= alturaPalco){
		this.diry=-1
		}else if(this.py <= 0){
		this.diry=1
		}
	}
	
	controlar=()=>{ //actualiza posicao da bolinha
		this.controle_bordas()
		this.px+=this.dirx*this.velx //atualiza posicao
		this.py+=this.diry*this.vely
		this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
		if((this.px > larguraPalco)||(this.py > alturaPalco)){
			this.remover()
	}
}
}

window.addEventListener("resize",(evt)=>{ //evento cuando redimensionamos la pantalla
	larguraPalco=palco.offsetWidth
	alturaPalco=palco.offsetHeight
})

btn_add.addEventListener("click",(evt)=>{
	const qtde=txt_qtde.value
	for(let i=0;i<qtde;i++){
		bolas.push(new Bola(bolas,palco)) //instanciar novas bolinhas
	}
})

btn_remover.addEventListener("click",(evt)=>{ //remover as bolinhas
	bolas.map((b)=>{
		b.remover()
	})
})