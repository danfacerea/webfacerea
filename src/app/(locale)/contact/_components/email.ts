"use server"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_AUTH,
	},
})

export const send = async (data: { name: string; email: string; message: string }) => {
	let success = true

	const mailConfig: nodemailer.SendMailOptions = {
		from: process.env.SMTP_USER,
		to: process.env.SMTP_USER,
		subject: "Contact Form Submission",
		text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
	}

	await new Promise((resolve, reject) => {
		transporter.sendMail(mailConfig, (err, info) => {
			if (err) {
				console.error(err)
				success = false
				reject(err)
			} else {
				console.log(info)
				resolve(info)
			}
		})
	}).catch(() => success = false)

	return success
}
