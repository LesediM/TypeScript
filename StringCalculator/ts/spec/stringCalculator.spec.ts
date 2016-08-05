/// <reference path="../../typings/index.d.ts" />

import { StringCalculator } from '../src/stringCalculator'

function CreateCalculator():StringCalculator {	
	return new StringCalculator();
}

describe('String calculator', function() {

	it('empty string returns 0', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('');
		// assert
		expect(result).toBe(0);
	});
	
	it('single number string returns number', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('1');
		// assert
		expect(result).toBe(1);
	});
	
	it('big single number string returns number', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('12');
		// assert
		expect(result).toBe(12);
	});
	
	it('two comma separated number string returns sum', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('1,2');
		// assert
		expect(result).toBe(3);
	});

	
	it('many numbers in string returns sum', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('1,2,3');
		// assert
		expect(result).toBe(6);
	});

	it('newline character in number string returns sum', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('1\n2,3');
		// assert
		expect(result).toBe(6);
	});

	it('new delimiter character in number string returns sum', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('//;\n1;2');
		// assert
		expect(result).toBe(3);
	});
	
	it('negative number in number string returns exception', function() {
		// arrange 
		let calc = CreateCalculator();
		let expected = "Negative numbers not allowed: -2";
		// act
		// assert
		expect(function () { calc.add('1,-2')}).toThrowError(expected);
	});

	it('many negative numbers in number string returns exception', function() {
		// arrange 
		let calc = CreateCalculator();
		let expected = "Negative numbers not allowed: -2,-3";
		// act
		// assert
		expect(function () { calc.add('1,-2,-3')}).toThrowError(expected);
	});

	it('should ignore numbers above 1000 in number string calculation', function() {
		// arrange 
		let calc = CreateCalculator();
		// act
		let result = calc.add('1001,2');
		// assert
		expect(result).toBe(2);
	});

	it('should allow new long delimiter character in number string returns sum', function() {
		// arrange
		let calc = CreateCalculator();
		// act
		let result = calc.add('//[***]\n1***2***3');
		// assert
		expect(result).toBe(6);
	});
	
	it('should allow multiple delimiters in number string returns sum', function() {
		// arrange
		let calc = CreateCalculator();
		// act
		let result = calc.add('//[*][%]\n1*2%3');
		// assert	
		expect(result).toBe(6); 
	});
});