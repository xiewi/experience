Album=(params)=>{
    const config = {
    	"createTime" : "2020.3.1",
        "author" : "XieWi",
        "styleText" : `body,html{height:100%;font-size:16px} *{padding:0;margin:0;list-style:none} .album-container{width:100%;height:100%;overflow:hidden;position:relative;background:rgba(0,0,0,.9)} .album-container .album-row{width:400%;height:100%;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center} .album-container .album-row li{display:block;width:25%} .album-container .album-row li img{max-width:100%;max-height:100%} .album-container .album-active{position:absolute;bottom:30px;width:100%;height:10px;display:-webkit-box;-webkit-box-align:center;-webkit-box-pack:center} .album-container .album-active li{width:5px;height:5px;border-radius:5px;background:rgba(255,255,255,.2);margin:0 5px 0}.album-container .album-active li.album-bright{background:rgba(255,255,255,1)}`
    };
    
    const width = window.innerWidth;
	let { el,data } = params;
        el = document.querySelector(el);
  		el.classList.add('album-container');
        let styleNode = document.createElement('style');
            styleNode.type = 'text/css';
            styleNode.setAttribute("author",config.author);
            styleNode.innerHTML = config.styleText;
  		document.body.insertBefore(styleNode,el);

    let elWrap = document.createDocumentFragment();
 	let ulNode = document.createElement('ul');
 	    ulNode.classList.add('album-row');
 	let olNode = document.createElement('ol');
 	    olNode.classList.add('album-active');
 	let imgsWrap = document.createDocumentFragment();
 	let radiusWrap = document.createDocumentFragment();
    
 	data.imgUrl.find((x,y)=>{
        let ullisNode = document.createElement('li');
        let imgsNode = document.createElement('img');
            imgsNode['src'] = x;
            ullisNode.appendChild(imgsNode);
            imgsWrap.appendChild(ullisNode);

        let ollisNode = document.createElement('li');
            y === 0 && ollisNode.classList.add('album-bright');
            radiusWrap.appendChild(ollisNode);
 	});
 	ulNode.appendChild(imgsWrap);
    olNode.appendChild(radiusWrap);
    elWrap.appendChild(ulNode);
    elWrap.appendChild(olNode);
    el.appendChild(elWrap);


    const childLength = data.imgUrl.length - 1;
    let active = olNode.children;
    let startX = endX = 0;
    let index = 0; 
    el.addEventListener('touchstart',function(e){
        startX = Math.ceil( e.touches[0].clientX );
    });
    el.addEventListener('touchmove',function(e){
        let moveX = Math.ceil( e.touches[0].clientX );
        endX = moveX - startX;  
        let moveStep = (-index * width) + endX;
        ulNode.style.transition = 'none';
        ulNode.style.transform = 'translateX('+ moveStep +'px)';
    });
    el.addEventListener('touchend',function(){
    	if( Math.abs(endX) < (width/3) ){
    		ulNode.style.transition = 'all .3s';
            ulNode.style.transform = 'translateX('+ (-index*width) +'px)';
    	}else{
			if(endX>0){
                index === 0 ? index : index--;
            }else{
				index === childLength ? index : index++;
            }
            ulNode.style.transition = 'all .3s';
            ulNode.style.transform = 'translateX('+ (-index*width) +'px)';	
    	}
    	for(let i=0;i<active.length;i++){
    		active[i].classList.remove('album-bright');
    	}
    	active[index].classList.add('album-bright');
    	startX = endX = 0;
    });
}	