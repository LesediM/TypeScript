export class StringCalculator {
    add(input: string): number {
        let numberString: string = input;
        if (!numberString) {
            return 0;
        }

        if (numberString.indexOf('//') >= 0) {
        numberString = this.ReplaceDelimitersWithDefault(numberString);
        }

        if (numberString.indexOf(',') >= 0) {
            numberString = numberString.replace('\n', ',');
            return this.Sum(numberString,',');
        }

        return Number(numberString);
    }

    private ReplaceDelimitersWithDefault(numberString:string):string {
      let split:string[] = numberString.split('\n');
        var delimiterSection:string = split[0];
        let numberSection:string = split[1]; 
        this.GetDelimiter(delimiterSection).forEach(function(delimiter){
           while(numberSection.indexOf(delimiter)>0){ 
           numberSection = numberSection.replace(delimiter,',');
           }
        });
            return numberSection;
    }

    private GetDelimiter(delimiterSection: string): string[] {
        var delimiters:string[] = delimiterSection.replace('//','').split('[');
        
        var array: string[] = [];
        delimiters.forEach(item => {
            if(item.length)
             {
                 array.push(item.replace(']',''));
            }
        });
       return array;
    }

    private CheckForNegativeNumbers(numberArray: string[]): void {
        let negativeNumbers: string[] = [];
        numberArray.forEach(element => {
            if (Number(element) < 0)
                negativeNumbers.push(element);
        });
        if (negativeNumbers.length > 0) {
            throw new Error("Negative numbers not allowed: " + negativeNumbers.join(','));

        }
    }

    private Sum(numberString: string, delimiter: string): number {
        var numberArray: string[] = numberString.split(delimiter);
        this.CheckForNegativeNumbers(numberArray);
        let total: number = 0;
        numberArray.forEach(function(aNumber: string) {
            var theNumber:number =  Number(aNumber);
            if(theNumber <= 1000){
                total += Number(aNumber);
                   }
        });
        return total;
    }

}



