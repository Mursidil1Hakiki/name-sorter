
let input = document.querySelector('input');
let obj=[];
let datasorted=[];
let showdata = document.querySelector('#txtBfrSorting') ;
let showdatasorted = document.querySelector('#txtAftSorting')
let btnsorting = document.querySelector('#btnSort');
let btndownload = document.querySelector('#btndownload');

input.addEventListener('change',function(e){
    console.log("isi file=>", input.files);
    let reader = new FileReader();
    reader.onload = function(){
        console.log("isi line", reader.result);
        showdata.innerHTML = reader.result;
        let line = reader.result.split('\n');        
        line.forEach(element => {
            let dataelement = element.split(/\W+/).filter(word => word.length > 0);
            console.log("isi element =>",dataelement);
            let firstname ="";
            let lastname="";
            for(let i = 0; i < dataelement.length; i++){
                
                if(i< dataelement.length-1){
                    firstname += dataelement[i]+" ";
                }else{
                    lastname = dataelement[i];
                }
            }
            console.log("cek firstname=>", firstname );
                console.log("cek latname=>", lastname );
            obj.push({
                firstName: firstname,
                lastName : lastname 
            });
            
            
        });
        
        console.log("isi obj", obj);       
        
    }
    reader.readAsText(input.files[0]);
},false)

btnsorting.addEventListener('click', function(e){   
    console.log("cek obj ---->", obj);
    let sorterdatas = obj.sort(function (a,b){
        
        if(a.lastName.toLowerCase() < b.lastName.toLowerCase()){
            console.log("cek LastName<<<",a.lastName.toLowerCase(),b.lastName.toLowerCase());
            return -1
        }
        if(a.lastName.toLowerCase() > b.lastName.toLowerCase()){
            console.log("cek LastName >>>",a.lastName.toLowerCase(),b.lastName.toLowerCase() );
            return 1
        }
        
        if(a.lastName.toLowerCase() == b.lastName.toLowerCase()){
            console.log("cek LastName ==>",a.lastName.toLowerCase(),b.lastName.toLowerCase());
            if(a.firstName.toLowerCase() < b.firstName.toLowerCase()){
                console.log("cek LastName<<<",a.firstName.toLowerCase(),b.firstName.toLowerCase());
                return -1
            }
            if(a.firstName.toLowerCase() > b.firstName.toLowerCase()){
                console.log("cek LastName >>>",a.firstName.toLowerCase(),b.firstName.toLowerCase() );
                return 1
            }
            return 0
        }
    });

    sorterdatas.forEach(element =>{
        let grouName = element.firstName + element.lastName +"\n";
        datasorted.push(grouName);
    });
    console.log("datasorted==>", datasorted);
    showdatasorted.innerHTML = datasorted;
},false)


btndownload.addEventListener('click', function(ei){  
    let datadownload = datasorted;
        

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,'
                + encodeURIComponent(datadownload));
        element.setAttribute('download', "sorted-names-list.txt");

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
},false)

