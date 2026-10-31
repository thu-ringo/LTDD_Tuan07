import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { Book, Category } from "../types";
import { TabScreenProps } from "../navigation/types";
import { colors, radius } from "../theme";

type SortOrder = "asc" | "desc" | null;
const SORT_OPTIONS: { key: SortOrder; label: string }[] = [
  { key: null, label: "Mặc định" }, { key: "asc", label: "Giá tăng dần" }, { key: "desc", label: "Giá giảm dần" },
];

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sort, setSort] = useState<SortOrder>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);
  const debouncedKeyword = useDebounce(keyword, 400);
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
    return sort === null ? filtered : [...filtered].sort((a, b) => sort === "asc" ? a.price - b.price : b.price - a.price);
  }, [books, debouncedKeyword, categoryId, priceRange, sort]);
  const hasFilter = keyword !== "" || categoryId !== null || priceRange !== null || sort !== null;
  const clearFilters = () => {
    setKeyword(""); setCategoryId(null); setPriceRange(null); setSort(null);
  };

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && <SearchBar value={keyword} onChangeText={setKeyword}
        onClose={() => { setSearchOpen(false); setKeyword(""); }} />}
      {loading ? <LoadingView label="Đang tải sách…" /> : error ? <ErrorView message={error} onRetry={load} /> : (
        <BookGrid data={visibleBooks} onPressBook={(book) => navigation.navigate("BookDetail", { bookId: book.id })}
          ListHeaderComponent={
            <View>
              <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              <View style={styles.options}>
                {SORT_OPTIONS.map((option) => (
                  <Pressable key={String(option.key)} onPress={() => setSort(option.key)}
                    accessibilityRole="button" accessibilityState={{ selected: sort === option.key }}
                    style={[styles.option, sort === option.key && styles.optionActive]}>
                    <Text style={[styles.optionText, sort === option.key && styles.optionActiveText]}>{option.label}</Text>
                  </Pressable>
                ))}
              </View>
              {hasFilter && <Pressable onPress={clearFilters} style={styles.clear}>
                <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
              </Pressable>}
            </View>
          }
          ListEmptyComponent={<EmptyState emoji="🔎" title="Không tìm thấy sách phù hợp"
            message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc." actionLabel="Xóa bộ lọc" onAction={clearFilters} />}
        />
      )}
      <FloatingCartButton count={totalQuantity} onPress={() => navigation.navigate("Cart")} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  options: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 10, paddingBottom: 10 },
  option: { padding: 8, borderRadius: radius.sm, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  optionActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  optionText: { color: colors.muted, fontSize: 12, fontWeight: "600" },
  optionActiveText: { color: "#fff" },
  clear: { alignSelf: "flex-start", marginHorizontal: 10, marginBottom: 10, padding: 8, borderRadius: radius.sm, backgroundColor: "#FEE2E2" },
  clearText: { color: "#B91C1C", fontWeight: "700" },
});
