import { LightningElement, track } from 'lwc';
import getExchangeRate from '@salesforce/apex/ExchangeRatesConverter.getExchangeRate'
export default class CurrencyConverter extends LightningElement {

    showoutput = false
    convertedValue ="";
    tocurrency="";
    fromcurrency="";
    enteredamount="";
    currencyOptions=[];
    @track Rate=""
    @track symbol=""

    amountHandler(event){
        let {name, value}=event.target

        if(name==="amount")
        {
            this.enteredamount=value;
        }
        else if(name==="fromcurr"){
            this.fromcurrency=value;
        }
        else if(name==="Tocurr"){
            this.tocurrency=value;
        }
    }

    ClickHandler(){

        getExchangeRate({
            amount:this.enteredamount, 
            fromCurrency:this.fromcurrency,
            toCurrency:this.tocurrency,
        }).then((result)=>{
            this.showoutput=true;
            const response = JSON.parse(result);
            //Access individual values
            const amount = response.amount;
            const baseCurrency = response.base;
            const date = response.date;
             this.Rate = response.rates[this.tocurrency];
             this.symbol =this.tocurrency;
            console.log('datajson', JSON.stringify(response));
            console.log('Amount', amount);
            console.log('Base Currency:', baseCurrency);
            console.log('Date:', date);
            console.log('Rate:', this.Rate);
        }).catch((error)=>{
            console.log('Some error has been occured while fetching details');
            this.showoutput=false;
        });
    }
    ClickReset(){
        this.showoutput=false;
        this.enteredamount=" "
        this.fromcurrency=" "
        this.tocurrency=" "
        this.template.querySelector('form').reset();
    }
}