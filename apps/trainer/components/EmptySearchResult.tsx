function EmptySearchResult() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <span className="text-text-primary text-title-2">검색 결과가 없습니다</span>
      <p className="text-text-sub3 text-body-1">다른 검색어를 입력해보세요</p>
    </div>
  );
}

export default EmptySearchResult;
