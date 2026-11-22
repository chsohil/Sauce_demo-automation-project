 class Loginpage
 {

    constructor(page)
    {
        this.page = page;
        this.baseurl =  process.env.BASE_URL
        //locators
        this.usernameInput = page.getByPlaceholder('Username')
        this.passwordInput  = page.getByPlaceholder('Password')
        this.loginbutton =   page.getByRole('button', { name: 'Login' })
 }
 

 async open(){
    console.log(`Opening base URL: ${this.baseurl}`);
    await this.page.goto(this.baseurl)
 }
 async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginbutton.click();
}
}




module.exports = {Loginpage};