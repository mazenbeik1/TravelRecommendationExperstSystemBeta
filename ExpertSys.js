//MODEL
const name=0;
const country=[
                ["Egypt","Arabic","Africa","Sea","Forest","Desert","All"],
                ["Palestine","Arabic","Asia","All"],
                ["SaudiArabia","Arabic","Asia","Desert","All"],
                ["Turkey","Turkish","Asia","Forest","All"],
                ["UnitedKingdom","English","Europe","All"],
                ["America","English","NorthAmerica","All"],
                ["Russia","Russian","Snow","Asia","Europe","All"],
                ["India","Hindi","Asia","All"],
                ["Spain","Spanish","Europe","All"],
                ["Australia","Australian","Australia","All"],
                ["Brazil","Portuguese","SouthAmerica","Forest","All"]
                ]

const checkBox=[
    "Africa",
    "Asia",
    "Australia",
    "Europe",
    "NorthAmerica",
    "SouthAmerica",
    "English",
    "Arabic",
    "Turkish",
    "Spanish",
    "Russian",
    "Hindi",
    "Forest",
    "Desert",
    "Sea"
]

let adjs=[]

let idCounter=2

let otherAdjs=[]

let selectedCountry=[]


function sortSelectedCountryByPower()
{
    selectedCountry.sort(function(a, b) {
        return b.power - a.power;
      });
}

function addCountry(countryName)
{
        let selected=0;
        selectedCountry.forEach(elem=>
            {
                if(countryName==elem.name)
                {
                    elem.power+=1;
                    selected=1;
                    return;
                }
            })
            if(!selected){
                selectedCountry.push({name:countryName,power:parseInt("1")});
            }
            sortSelectedCountryByPower();
}

function selectCountry()
{
    adjs.forEach(adjObj=>
        {
            country.forEach(countryObj=>
                {
                    countryObj.forEach(countryObjAdj=>
                        {
                            if(adjObj.name==countryObjAdj)
                            {
                                addCountry(countryObj[name]);
                            }
                        })
                })
        })
}


function createOther(key)
{
    otherAdjs.push({name:key,id:idCounter++});
    renderOther();
}

function removeOther(id)
{
    otherAdjs=otherAdjs.filter(obj=>
        {
                return obj.id!==id;
        })
        renderOther();
}

function restartArr(Arr)
{
    Arr=new Array();
}

function addToAdjs(adj)
{
    adjs=adjs.filter(elem=>
        {
            return elem!==adj;
        })
        adjs.push(adj);

}

function check()
{
    checkBox.forEach(filter =>
        {
            if(document.getElementById(filter).checked)
            {
                let notInAdjs=1;
                adjs.forEach(adj=>
                    {
                        if(adj.name==filter)
                        {
                            notInAdjs=0;
                        }
                    })
                if(notInAdjs){addToAdjs({name:filter,id:0});}   
            }
        });
}

function combineAdjs()
{
    adjs=otherAdjs;
    check()
}

function infer(inference,rule1,rule2="All")
{
    
    country.forEach(obj=>
        {
            let checkInf=0;
            let checkRule1=0;
            let checkRule2=0;
            obj.forEach(adj=>
            {
                if(adj==inference){checkInf=1;}
                if(adj==rule1){checkRule1=1;}
                if(adj==rule2){checkRule2=1;}
            })
            
            if(!checkInf && checkRule1 && checkRule2)
            {
                obj.push(inference);
            }
        })
}


//CONTROLLER

function SearchButton()
{
    selectedCountry=new Array();
    adjs=new Array();
    combineAdjs();

    selectCountry();

    render();
    
}

function addButton()
{
    if(document.getElementById("OtherInput").value!=="")
    {
        let val=formatInput(document.getElementById("OtherInput").value);
        let checker=1;
        otherAdjs.forEach(key=>{
            if(key.name==val)
            {
                checker=0;
            }
        })
        if(checker)
        {
            createOther(val);
        }
    }else(alert("Please enter a keyword first!!"))
}

function removeButton(id)
{
    removeOther(id);
}

function formatInput(input)
{
    input=input.toLowerCase();
    input = input.replace(input[0], input[0].toUpperCase());
    return input;
}

function updateButton()
{
    let inference;

    if(document.getElementById("Inference").value=="")
    {
        alert("Please enter Inference!!");
    }else if(document.getElementById("FirstRule").value!=="" && document.getElementById("SecondRule").value!=="")
    {
        let rule1=formatInput(document.getElementById("FirstRule").value);
        let rule2=formatInput(document.getElementById("SecondRule").value);
        inference=formatInput(document.getElementById("Inference").value);
        infer(inference,rule1,rule2);
    }else if(document.getElementById("FirstRule").value!=="" || document.getElementById("SecondRule").value!=="")
    {
        let rule;
        if(document.getElementById("FirstRule").value=="")
        {
            rule=formatInput(document.getElementById("SecondRule").value);
        }else if(document.getElementById("SecondRule").value=="")
        {
            rule=formatInput(document.getElementById("FirstRule").value);
        }
        inference=formatInput(document.getElementById("Inference").value);
        infer(inference,rule);
    }else if(document.getElementById("FirstRule").value=="" || document.getElementById("SecondRule").value=="")
    {
        alert("Please enter atleast 1 rule!!");
    }else(alert("Unexpected error!"))
}

//VIEW
function render()
{
    renderOther();
    renderOutput();

    console.log(adjs);
}

function renderOutput()
{
    document.getElementById("Output").innerHTML="";
    selectedCountry.forEach(obj =>
    {
        let nameElement=document.createElement("div");
        nameElement.innerText=obj.name;
        nameElement.style.fontWeight="bolder";
        document.getElementById("Output").appendChild(nameElement);
    })
}

function renderOther()
{
    document.getElementById("OtherList").innerHTML="";
    otherAdjs.forEach(function(key)
    {
        let otherElement=document.createElement("div");
        otherElement.id=key.id;
        otherElement.style="display:flex";
        document.getElementById("OtherList").appendChild(otherElement);
        
        let otherKey=document.createElement("div");
        otherKey.innerText=key.name;
        otherKey.id=key.id;
        document.getElementById(key.id).appendChild(otherKey);

        let otherButton=document.createElement("button");
        otherButton.innerText="X";
        otherButton.id=key.id;
        otherButton.onclick=function(){removeButton(parseInt(this.id));}
        document.getElementById(key.id).appendChild(otherButton);

    });
}
