const mongoose = require("mongoose");

const financialData = new mongoose.Schema({
    clamount:Number,
    clterm:Number,
    cirate:Number,
    cbcost:Number,
    ccbal:Number,
    ccapr:Number,
    damt:Number,
    dapy:Number,
    dterm:Number,
    mlamount:Number,
    mlterm:Number,
    mirate:Number,
    mbcost:Number,

},
{
    collection: "FinancialData", 
}
);

mongoose.model("FinancialData",financialData);