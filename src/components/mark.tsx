export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  if (keyword === name) {
    return <span style={{ color: "#257AFD" }}>{name}</span>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str === "" ? (
            <span style={{ color: "#257AFD" }}>{keyword}</span>
          ) : (
            str
          )}
        </span>
      ))}
    </>
  );
};
