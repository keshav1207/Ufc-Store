
export default function CookiePolicyInfo(){
    return(
        <section className="footerLinksInfo">

        <h1>COOKIE POLICY PAGE</h1>

        <br></br>

        <p>When you visit the site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to 
            the site, and information about how you interact with the site.</p>
        
         <br></br>

        {/* In this example, target="_blank" is used to instruct the browser to open the link in a new tab or window. Additionally, the rel="noopener noreferrer" attribute is added for security reasons. 
        It helps prevent potential security vulnerabilities related to opening links in a new tab. */}

        <p>“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit  
        <a href='https://www.allaboutcookies.org' target="_blank" rel="noopener noreferrer">https://www.allaboutcookies.org</a>.    </p>
            
        </section>


    )
}