process.stdin.resume()
process.stdin.setEncoding('utf8')

console.log('Coudl you please give me your age at the end of this year ?')
process.stdin.on('data', (age) => {
    const currentYear = new Date().getFullYear()
    const yearOfBirth = currentYear-age
    if(typeof age === "string" && age <= 99 && yearOfBirth < currentYear) {
        console.log(`You are borne in ${yearOfBirth}.`)
    } else {
        console.log("Try again.")
    }
    process.exit()
})