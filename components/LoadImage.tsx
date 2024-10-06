async function LoadImage({ Url, Css }: { Url: string; Css: string }) {
  const res = await fetch(`${process.env.Url}/api/image/${Url}`);
  const { image } = await res.json();
  return <img src={image} className={Css} />;
}

export default LoadImage;
