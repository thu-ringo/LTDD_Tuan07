import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBookById } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useCart, useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors, formatPrice, radius } from "../theme";

// gọi getBookById thay cho mảng tĩnh; có loading + lỗi + thử lại
export function BookDetailScreen({ route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add, items } = useCart();
  const { isFavorite, toggle } = useWishlist();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try { setBook(await getBookById(bookId)); }
    catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, [bookId]);
  useEffect(() => { void load(); }, [load]);
  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;
  const quantity = items.find((item) => item.bookId === book.id)?.quantity ?? 0;
  const atLimit = quantity >= book.stock;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <Pressable style={[styles.btn, atLimit && { opacity: 0.4 }]} disabled={atLimit}
        onPress={() => add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock })}>
        <Text style={styles.btnText}>{book.stock <= 0 ? "Hết hàng" : atLimit ? "Đã đạt số lượng tồn kho" : "Thêm vào giỏ"}</Text>
      </Pressable>
      <Pressable style={styles.favorite} accessibilityRole="button" accessibilityLabel={isFavorite(book.id) ? "Bỏ yêu thích" : "Thêm yêu thích"}
        onPress={() => toggle(book.id)}>
        <Text style={styles.favoriteText}>{isFavorite(book.id) ? "♥ Đã yêu thích" : "♡ Thêm yêu thích"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginTop: 4 },
  btn: { backgroundColor: colors.indigo, padding: 14, borderRadius: radius.md, alignItems: "center", marginTop: 12 },
  favorite: { padding: 14, alignItems: "center", borderRadius: radius.md, borderWidth: 1, borderColor: colors.indigo },
  favoriteText: { color: colors.indigo, fontWeight: "700", fontSize: 16 },
  btnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
