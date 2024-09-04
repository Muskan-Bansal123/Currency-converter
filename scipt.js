window.onload = function() {
    document.getElementById('myInput').focus();
};

const baseurl="https://2024-03-06.currency-api.pages.dev/v1/currencies";
const dropdown=document.querySelectorAll("select");
const btn=document.querySelector("#btn");
const fromcurr=document.querySelector(".from select"); 
const toCurr=document.querySelector(".to select"); 
const msg=document.querySelector(".msg");  



for(select of dropdown)
{
for (let currcode in country) {
    let adddropdown = document.createElement("option");
    adddropdown.innerText = currcode; // Display currency code
    adddropdown.value = currcode;     // Set value as currency code
     
    if(select.name==="from" && currcode==="USD")
    {
        adddropdown.selected="selected";
    }
    else if(select.name==="to" && currcode==="INR")
  {
      adddropdown.selected="selected";
  }
  select.append(adddropdown); 
  }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);   //eve.target provides access to all the properties of the element
  });
}

const updateFlag=(element)=>{  //inside element we have select and we have to access img tag from it
    let currc=element.value;
    let countcode=country[currc];  //in
    let newsrc=`https://flagsapi.com/${countcode}/flat/64.png`;
    let img =element.parentElement.querySelector("img");
    img.src=newsrc;
   
}


btn.addEventListener("click",async (evt)=>{
    evt.preventDefault(); //to stop form's default property of reloading page when it is submitted
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amount.value==""||amount.value<1)
    {
        amount.value="1";

        amtval=1;
    }
  
const url=`${baseurl}/${fromcurr.value.toLowerCase()}.json`;
  let response=await fetch(url);
  let data=await response.json();
  let exchangerate=data[fromcurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let finalamount=amtval*exchangerate;
  console.log(finalamount);
   msg.innerText=`${amtval}${fromcurr.value}=${finalamount.toFixed(2)}${toCurr.value}`;
});