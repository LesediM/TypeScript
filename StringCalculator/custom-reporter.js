var white = 37,
    green = 32,
    red = 31,
    yellow = 33,
    blue = 34,
    purple = 35,
    teal = 36,
    whiteOnRed = 41;

function write(s) {
    process.stdout.write(s);
}

function writeColor(color, message) {
    //console.log(message);
    write('\x1B[' + color + 'm' + message);
}

function resetConsoleColors() {
    write('\x1B[0m');
}

function writeSlash() {
    writeColor(white, ' / ');
}

var emptyLine = '                                ';
function clearLine() {
    resetConsoleColors();
    write('\r' + emptyLine + '\r');
}

var fieldWidth = 6;
function padOut(s) {
    s = String(s);
    while (s.length < fieldWidth) {
        if (s.length % 2) {
            s = s + ' ';
        } else {
            s = ' ' + s;
        }
    }
    return s;
}

function Reporter() {
}

var headers = [
    [green, 'pass'],
    [red, 'fail'],
    [teal, 'skip'],
    [yellow, 'total'],
]

Reporter.prototype = {
    jasmineStarted: function (info) {
        console.log('test run at: ' + (new Date()));
        this._reset();
        // console.log(info);
        this.total = info.totalSpecsDefined;
        this._printHeader();
        this._printState();
    },
    suiteStarted: function (result) {
        //console.log('suiteStarted:', result);
        this._currentDescription = result.description;
        this._fullName = result.fullName;
    },
    specStarted: function (result) {
        // console.log('specStarted:', result)
    },
    specDone: function (result) {
        if (result.status === 'pending') {
            this.skip++;
        } else {
            this._recordState(result);
        }
        this._printState();
    },
    _recordState: function (result) {
        if (result.failedExpectations.length) {
            this.failed++;
            this._failures.push(result);
        } else {
            this.passed++;
        }
    },
    suiteDone: function (result) {
        // console.log('suiteDone:', result);        
    },
    jasmineDone: function (result) {
        // console.log('jasmineDone:', result);
        console.log('');
        this._reportErrors();
    },
    _reportErrors: function () {
        this._failures.forEach(function (f) {
            writeColor(red, f.description);
            resetConsoleColors();
            write('\n')
            f.failedExpectations.forEach(function (e) {
                console.log(e.message);
                console.log(e.stack);
            })
            write('\n');
        });
    },
    _reset: function () {
        this.passed = 0;
        this.failed = 0;
        this.skip = 0;
        this.total = 0;
        this._failures = [];
    },
    _printState: function () {
        var line = [
            [green, this.passed],
            [red, this.failed],
            [teal, this.skip],
            [yellow, this.total]
        ];
        this._printLine(line);
    },
    _printHeader: function () {
        this._printLine(headers);
        write('\n');
    },
    _printLine: function (lineParts) {
        clearLine();
        var self = this;
        lineParts.forEach(function(part, idx) {
            self._writeField(part[0], part[1]);
            if (idx < lineParts.length - 1) {
                writeSlash();
            }
        })
        resetConsoleColors();
    },
    _writeField(color, value) {
        writeColor(color, padOut(value));
    }
};

module.exports = Reporter; 