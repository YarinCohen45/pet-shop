import { Image } from "react-bootstrap"

export default function Footer() {
    const styles = {
        container: {
            width: '100%',
            height: 250, 
            backgroundColor: '#101010',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        image: {
            width: 30,
            height: 30,
            marginRight: 10,
            borderRadius: 50,
            tintColor: '#ffffff',
        },
        logos: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            height: 'auto',
            gap: 40,
        },
        footerTitle: {
            fontSize: 30,
            fontWeight: 700,
            color: 'white',
        },
        navText: {
            textDecoration: 'none',
            color: 'white',
            fontSize: 20,
            fontWeight: 650,
        }
    }


    return (
        <div style={styles.container}>
            <p style={styles.footerTitle}>© 2023 Yarin Cohen</p>
            <div style={styles.logos}>       
                <a style={styles.navText} href="https://www.linkedin.com/in/yarin-cohen-813884229/">
                    <Image style={styles.image} alt src="https://i.imgur.com/dyRUluI.png"/>
                    LinkedIn
                </a>
                <a style={styles.navText} href="https://github.com/YarinCohen45">
                    <Image style={styles.image} alt src="https://i.imgur.com/AwMhij5.png"/>
                    GitHub
                </a>
            </div>
        </div>
    )
}