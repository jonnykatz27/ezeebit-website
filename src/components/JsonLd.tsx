type JsonLdProps = {
  data: unknown
}

/**
 * One unescaped JSON-LD block. React text children inside <script> are
 * HTML-escaped during SSR, which makes the graph invalid for crawlers.
 */
const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data).replace(/</g, '\\u003c'),
    }}
  />
)

export default JsonLd
