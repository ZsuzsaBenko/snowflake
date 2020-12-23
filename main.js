import SnowFlakeGenerator from './snowflake.js';

class Main {
    button = document.querySelector('button');

    generateSnowflakeOnClick() {
        this.button.addEventListener('click', () => {
            const snowFlakeGenerator = new SnowFlakeGenerator();
            snowFlakeGenerator.getRandomSizes();
            snowFlakeGenerator.buildSnowFlake();
        });
    }
}

const main = new Main();
main.generateSnowflakeOnClick();

