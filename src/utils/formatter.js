function formatCurrency(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
}

module.exports = { formatCurrency };
const bcrypt = require('bcrypt');

async function test() {
    const password = '123456';
    const hashed = await bcrypt.hash(password, 10);
    console.log('Hashed:', hashed);

    const match = await bcrypt.compare('123456', hashed);
    console.log('Match:', match);
}

test();
