import ConsultStyle from "./ConsultationPageComponent.module.scss"

function ConsultationPageComponent() {
    return (
        <>
            <section className={ConsultStyle.questionSection}>
                <div className={ConsultStyle.left_container}>
                    <h1 className={ConsultStyle.pageTitle}>do you have a <br />problem?</h1>
                    <form action="#" className={ConsultStyle.form}>
                        <div className={ConsultStyle.input_container}>
                            <label htmlFor="name-input" className={ConsultStyle.input_label}>name</label>
                            <input type="text" id="name-input" className={ConsultStyle.input} />
                        </div>
                        <div className={ConsultStyle.input_container}>
                            <label htmlFor="email-input" className={ConsultStyle.input_label}>email</label>
                            <input type="email" id="email-input" className={ConsultStyle.input} />
                        </div>
                        <div className={ConsultStyle.textarea_container}>
                            <label htmlFor="text-area" className={ConsultStyle.input_label}>your message:</label>
                            <textarea className={ConsultStyle.textArea} name="message" id="text-area"></textarea>
                        </div>
                        <input type="submit" className={ConsultStyle.submit_input} value="Send message" />
                    </form>
                </div>
                <div className={ConsultStyle.right_container}>
                    <div className={ConsultStyle.image_container}>
                        <img src="./../../../../public/general_images/operator.png" alt="operator" className={ConsultStyle.image} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default ConsultationPageComponent