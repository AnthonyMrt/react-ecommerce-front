import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => (
  <Document>
    <Page style={styles.body}>
      <Text style={styles.header} fixed>
        ~ {new Date().toLocaleString()} ~
      </Text>
      <Text style={styles.title}>Facture commande id: {order.paymentIntent.id}</Text>
      <Text style={styles.author}>React Redux Ecommerce</Text>
      <Text style={styles.subtitle}>Résumé commande</Text>

      <Table>
        <TableHeader>
          <TableCell>Nom</TableCell>
          <TableCell>Prix</TableCell>
          <TableCell>Quantité</TableCell>
          <TableCell>Marque</TableCell>
          <TableCell>Couleur</TableCell>
        </TableHeader>
      </Table>

      <Table data={order.products}>
        <TableBody>
          <DataTableCell getContent={(x) => x.product.title} />
          <DataTableCell getContent={(x) => `${x.product.price} €`} />
          <DataTableCell getContent={(x) => x.count} />
          <DataTableCell getContent={(x) => x.product.brand} />
          <DataTableCell getContent={(x) => x.product.color} />
        </TableBody>
      </Table>

      <Text style={styles.text}>
        <Text>
          Date: {"               "}
          {new Date(order.paymentIntent.created * 1000).toLocaleString()}
        </Text>
        {"\n"}
        <Text>
          Commande Id: {"         "}
          {order.paymentIntent.id}
        </Text>
        {"\n"}
        <Text>
          Commande Statut: {"  "}
          {order.orderStatus}
        </Text>
        {"\n"}
        <Text>
          Total payer: {"       "}
          {(order.paymentIntent.amount / 100)} €
        </Text>
      </Text>

      <Text style={styles.footer}> ~ Merci pour votre achat et votre confiance en nous ~ </Text>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;
