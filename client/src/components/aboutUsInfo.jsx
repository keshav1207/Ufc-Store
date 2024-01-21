import AboutUsPic from "../assets/about-us.png"


export default function AboutUsInfo(){
    return(
        <section className="footerLinksInfo">
        
        <h1>ABOUT</h1>
        <br></br>
        <p>UFC Store is your shopping destination for the latest UFC gear and MMA merchandise. The store offers a wide selection of products from top quality brands around the globe, including authentic walkout apparel and clothing and accessories for men, women and children. Our goal is to offer access to a huge assortment of top quality UFC products to MMA fans across the world to help fans celebrate their passion for the sport. We pride ourselves on not only carrying officially licensed products, 
            but also providing industry leading service to our customers.</p>
        <br></br>
        <img src={AboutUsPic} alt="AboutUsPicture" />
      
        
        </section>

    )
}