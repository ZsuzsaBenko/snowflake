class SnowFlakeGenerator {
    canvas = document.getElementById('canvas');
    context = this.canvas.getContext('2d');
    snowFlakeColor = 'white';
    baseLineLength = 150;
    diagonalLineLength = 200;
    longLineLength = 50;
    shortLineLength = 10;
    step = 25;
    center = {x: 400, y: 400};
    nextLines = [];
    lines = [];

    drawLine(x, y, length, direction) {
        if (this.context) {
            this.context.beginPath();
            this.context.moveTo(x, y);
            let firstBranchPosition;
            switch (direction) {
                case 'UP':
                    this.context.lineTo(x, y - length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x, y: y - this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'DOWN':
                    this.context.lineTo(x, y + length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x, y: y + this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'LEFT':
                    this.context.lineTo(x - length, y);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x - this.step, y, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'RIGHT':
                    this.context.lineTo(x + length, y);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x + this.step, y, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'LEFT_UP':
                    this.context.lineTo(x - length, y - length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x - this.step, y: y - this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'LEFT_DOWN':
                    this.context.lineTo(x - length, y + length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x - this.step, y: y + this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'RIGHT_UP':
                    this.context.lineTo(x + length, y - length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x + this.step, y: y - this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
                case 'RIGHT_DOWN':
                    this.context.lineTo(x + length, y + length);
                    if (this.shortLineLength < length) {
                        firstBranchPosition = {x: x + this.step, y: y + this.step, done: false};
                        this.nextLines.push({x, y, length, direction, branchPositions: [firstBranchPosition]});
                    }
                    break;
            }
            this.context.strokeStyle = this.snowFlakeColor;
            this.context.stroke();
        }

    }

    drawBaseLines() {
        this.drawLine(this.center.x, this.center.y, this.diagonalLineLength, 'LEFT_UP');
        this.drawLine(this.center.x, this.center.y, this.diagonalLineLength, 'LEFT_DOWN');
        this.drawLine(this.center.x, this.center.y, this.diagonalLineLength, 'RIGHT_UP');
        this.drawLine(this.center.x, this.center.y, this.diagonalLineLength, 'RIGHT_DOWN');
        this.drawLine(this.center.x, this.center.y, this.baseLineLength, 'LEFT');
        this.drawLine(this.center.x, this.center.y, this.baseLineLength, 'RIGHT');
        this.drawLine(this.center.x, this.center.y, this.baseLineLength, 'UP');
        this.drawLine(this.center.x, this.center.y, this.baseLineLength, 'DOWN');
    }

    getBranchDirections(mainDirection) {
        switch (mainDirection) {
            case 'UP':
                return ['LEFT_UP', 'RIGHT_UP'];
            case 'DOWN':
                return ['LEFT_DOWN', 'RIGHT_DOWN'];
            case 'LEFT':
                return ['LEFT_UP', 'LEFT_DOWN'];
            case 'RIGHT':
                return ['RIGHT_UP', 'RIGHT_DOWN'];
            case 'LEFT_UP':
                return ['LEFT', 'UP'];
            case 'RIGHT_UP':
                return ['RIGHT', 'UP'];
            case 'LEFT_DOWN':
                return ['LEFT', 'DOWN'];
            case 'RIGHT_DOWN':
                return ['RIGHT', 'DOWN'];
        }

    }

    addNextBranchPosition(line) {
        if ((line.branchPositions.length + 1) * this.step < line.length) {
            const prevPosition = line.branchPositions[line.branchPositions.length - 1];

            switch (line.direction) {
                case 'UP':
                    line.branchPositions.push({x: prevPosition.x, y: prevPosition.y - this.step, done: false});
                    break;
                case 'DOWN':
                    line.branchPositions.push({x: prevPosition.x, y: prevPosition.y + this.step, done: false});
                    break;
                case 'LEFT':
                    line.branchPositions.push({x: prevPosition.x - this.step, y: prevPosition.y, done: false});
                    break;
                case 'RIGHT':
                    line.branchPositions.push({x: prevPosition.x + this.step, y: prevPosition.y, done: false});
                    break;
                case 'LEFT_UP':
                    line.branchPositions.push({x: prevPosition.x - this.step, y: prevPosition.y - this.step, done: false});
                    break;
                case 'RIGHT_UP':
                    line.branchPositions.push({x: prevPosition.x + this.step, y: prevPosition.y - this.step, done: false});
                    break;
                case 'LEFT_DOWN':
                    line.branchPositions.push({x: prevPosition.x - this.step, y: prevPosition.y + this.step, done: false});
                    break;
                case 'RIGHT_DOWN':
                    line.branchPositions.push({x: prevPosition.x + this.step, y: prevPosition.y + this.step, done: false});
                    break;
            }
        }

    }

    doIterations(iterationNumber) {
        this.drawBaseLines();
        for (let i = 1; i <= iterationNumber; i++) {
            for (const line of this.lines) {
                for (const position of line.branchPositions) {
                    const directions = this.getBranchDirections(line.direction);
                    if (!position.done) {
                        if (0 === i % 2) {
                            this.drawLine(position.x, position.y, this.shortLineLength, directions[0]);
                            this.drawLine(position.x, position.y, this.shortLineLength, directions[1]);
                        } else {
                            this.drawLine(position.x, position.y, this.longLineLength, directions[0]);
                            this.drawLine(position.x, position.y, this.longLineLength, directions[1]);
                        }
                    }
                    position.done = true;
                }
                this.addNextBranchPosition(line);

            }
            this.lines = [...this.nextLines];
        }
    }

}

const snowFlakeGenerator = new SnowFlakeGenerator();
snowFlakeGenerator.doIterations(10);
