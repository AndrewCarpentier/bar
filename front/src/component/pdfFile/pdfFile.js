import { Page, View, Image, Document } from "@react-pdf/renderer";

export function PDFFile({ src }) {
  return (
    <Document>
      <Page size="A4">
        <View>
          <Image src={src} />
        </View>
      </Page>
    </Document>
  );
}
