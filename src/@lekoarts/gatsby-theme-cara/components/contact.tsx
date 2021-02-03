/** @jsx jsx */
import { jsx } from "theme-ui"
import styled from "@emotion/styled"
import Divider from "../elements/divider"
import Inner from "../elements/inner"
import Content from "../elements/content"
import { UpDown, UpDownWide, waveAnimation } from "../styles/animations"
// @ts-ignore
import ContactMDX from "../sections/contact"

const InnerWave = styled.div`
  path {
    ${waveAnimation(`20s`)};
  }
`

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export default function Contact(offset) {
  const [state, setState] = React.useState({})

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error))
  }

  return (
    <div>
        <Divider fill="divider" speed={0.2} offset={offset} factor={factor}>
        <div sx={{ position: `absolute`, bottom: 0, width: `full`, transform: `matrix(1, 0, 0, -1, 0, 0)` }}>
            <InnerWave sx={{ position: `relative`, height: `full`, svg: { width: `100%`, height: `40vh` } }}>
            <svg xmlns="http://www.w3.org/2000/svg" id="contact-wave" viewBox="0 0 800 338.05" preserveAspectRatio="none">
                <path>
                <animate
                    attributeName="d"
                    values="M 0 100 Q 250 50 400 200 Q 550 350 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 200 150 400 200 Q 600 250 800 300 L 800 0 L 0 0 L 0 100 Z;M 0 100 Q 150 350 400 200 Q 650 50 800 300 L 800 0 L 0 0 L 0 100 Z"
                    repeatCount="indefinite"
                    dur="30s"
                />
                </path>
            </svg>
            </InnerWave>
        </div>
        </Divider>
        <Content speed={0.4} offset={offset} factor={factor}>
        <Inner>
            <ContactMDX />

            <form
                name="contact"
                method="post"
                action="/thanks/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                <label>
                    Don’t fill this out: <input name="bot-field" onChange={handleChange} />
                </label>
                </p>
                <p>
                <label>
                    Your name:
                    <br />
                    <input type="text" name="name" onChange={handleChange} />
                </label>
                </p>
                <p>
                <label>
                    Your email:
                    <br />
                    <input type="email" name="email" onChange={handleChange} />
                </label>
                </p>
                <p>
                <label>
                    Message:
                    <br />
                    <textarea name="message" onChange={handleChange} />
                </label>
                </p>
                <p>
                <button type="submit">Send</button>
                </p>
            </form>
        </Inner>
        </Content>
        <Divider speed={0.1} offset={offset} factor={factor}>
        </Divider>
    </div>

  )
}
