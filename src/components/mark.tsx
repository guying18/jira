export const getMatchPosition = (name: string, keyword: string) => {
  const matchedIndices = [];
  let idx = 0;
  for (let i = 0; i < 10; i++) {
    idx = name.indexOf(keyword, idx);
    if (idx === -1) {
      break;
    }
    matchedIndices.push(idx);
    idx = idx + keyword.length;
  }
  return matchedIndices;
};

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
