"use strict";
var StringCalculator = (function () {
    function StringCalculator() {
    }
    StringCalculator.prototype.add = function (input) {
        var numberString = input;
        if (!numberString) {
            return 0;
        }
        if (numberString.indexOf('//') >= 0) {
            numberString = this.ReplaceDelimitersWithDefault(numberString);
        }
        if (numberString.indexOf(',') >= 0) {
            numberString = numberString.replace('\n', ',');
            return this.Sum(numberString, ',');
        }
        return Number(numberString);
    };
    StringCalculator.prototype.ReplaceDelimitersWithDefault = function (numberString) {
        var split = numberString.split('\n');
        var delimiterSection = split[0];
        var numberSection = split[1];
        this.GetDelimiter(delimiterSection).forEach(function (delimiter) {
            while (numberSection.indexOf(delimiter) > 0) {
                numberSection = numberSection.replace(delimiter, ',');
            }
        });
        return numberSection;
    };
    StringCalculator.prototype.GetDelimiter = function (delimiterSection) {
        var delimiters = delimiterSection.replace('//', '').split('[');
        var array = [];
        delimiters.forEach(function (item) {
            if (item.length) {
                array.push(item.replace(']', ''));
            }
        });
        return array;
    };
    StringCalculator.prototype.CheckForNegativeNumbers = function (numberArray) {
        var negativeNumbers = [];
        numberArray.forEach(function (element) {
            if (Number(element) < 0)
                negativeNumbers.push(element);
        });
        if (negativeNumbers.length > 0) {
            throw new Error("Negative numbers not allowed: " + negativeNumbers.join(','));
        }
    };
    StringCalculator.prototype.Sum = function (numberString, delimiter) {
        var numberArray = numberString.split(delimiter);
        this.CheckForNegativeNumbers(numberArray);
        var total = 0;
        numberArray.forEach(function (aNumber) {
            var theNumber = Number(aNumber);
            if (theNumber <= 1000) {
                total += Number(aNumber);
            }
        });
        return total;
    };
    return StringCalculator;
}());
exports.StringCalculator = StringCalculator;
