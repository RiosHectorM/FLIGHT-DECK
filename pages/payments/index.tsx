
import Image from "next/image"
import styles from  "../../styles/payment.module.css" 
import { checkout } from "./checkout"

export default function Payments() {

  interface items {
    price: string,
    quantity: number
  }
  interface lineItems extends Array<items>{}

  return (
    <div className={styles.container}>
     
      <main className={styles.main}>
        <h1 className={styles.title}>Choose your Subscription</h1>
        <div className={styles.grid}>
          <div>
            <Image className={styles.card}
              src="/images/1year.jpg"
              alt="NFT"
              width={400}
              height={400}
            />
            <p className={styles.p}>1 Year Subscription</p>
            <button onClick={(() => {
              checkout({
                lineItems:[] = [
                  {
                    price: "price_1N3ADqKWrlIRXPNafJ8vxHUL",
                    quantity: 1
                  }
                ]
              })
            })}>BUY!</button>
          </div>
          <div>
            <Image className={styles.card}
              src="/images/3months.jpg"
              alt="NFT"
              width={400}
              height={400}
            />
            <p className={styles.p}>3 Months Subscription</p>
            <button className={styles.buttom} onClick={(() => {
              checkout({
                lineItems:[] = [
                  {
                    price: "price_1N4CjvKWrlIRXPNajd9lDxuW",
                    quantity: 1
                  }
                ]
              })
            })}>BUY!</button>
          </div>
        </div>
      </main>
    </div>
  )
}
