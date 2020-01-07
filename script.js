
let input = document.querySelector('input');
let obj=[];
let sorterdatas=[];
let showdata = document.querySelector('#txtBfrSorting') ;
let showdatasorted = document.querySelector('#txtAftSorting')
let btnsorting = document.querySelector('#btnSort');
let btndownload = document.querySelector('#btndownload');
let groupName;
let stringGroupName ="";

input.addEventListener('change',function(e){
    let reader = new FileReader();
    let inputblob = new Blob(input.files);
    reader.readAsText(inputblob);
    reader.onload = function(){
        showdata.innerHTML = reader.result;
        let line = reader.result.split('\n');        
        line.forEach(element => {
            let dataelement = element.split(/\W+/).filter(word => word.length > 0);
            let firstname ="";
            let lastname="";
            for(let i = 0; i < dataelement.length; i++){
                
                if(i< dataelement.length-1){
                    firstname += dataelement[i]+" ";
                }else{
                    lastname = dataelement[i];
                }
            }
            obj.push({
                firstName: firstname,
                lastName : lastname 
            });
        });        
    }
},false);

function sorter(objSorter){
    sorterdatas = objSorter.sort(function (a,b){        
        if(a.lastName.toLowerCase() < b.lastName.toLowerCase()){
            return -1
        }
        if(a.lastName.toLowerCase() > b.lastName.toLowerCase()){
            return 1
        }        
        if(a.lastName.toLowerCase() == b.lastName.toLowerCase()){
            if(a.firstName.toLowerCase() < b.firstName.toLowerCase()){
                return -1
            }
            if(a.firstName.toLowerCase() > b.firstName.toLowerCase()){
                return 1
            }
            return 0
        }
    });
}

btnsorting.addEventListener('click', function(e){   
    var datasorted =[];
    sorter(obj);    
    sorterdatas.forEach(element =>{
        groupName = element.firstName + element.lastName +"\n";
        datasorted.push(groupName);
    });

    datasorted.forEach(dataarray => {
        console.log("cek dataarray-->", dataarray);
        stringGroupName += dataarray;
    })
    showdatasorted.innerHTML = stringGroupName;
},false)


btndownload.addEventListener('click', function(ei){  
    let datadownload = stringGroupName;
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,'
            + encodeURIComponent(datadownload));
    element.setAttribute('download', "sorted-names-list.txt");

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

    document.body.removeChild(element);
},false)

