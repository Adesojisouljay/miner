import "./stunt.css"

export default function Stunt() {
  return (
    <div className="main-margin min-h-screen  hidden md:block">

    <div className="wrapper  ">
        <h1 className="text-center mt-[10px] mb-8 text-[32px]">Communities</h1>   
    <div className="container">
        <input type="radio" name="slide" id="c1" defaultChecked />
        <label data-aos="zoom-in" htmlFor="c1" className="card">
            <div className="row">
                <div className="icon">1</div>
                <div className="description">
                    <h4>Breakaway Commuinty</h4>
                    <p>Tokenized Breakaway Communities</p>
                </div>
            </div>
        </label>
        <input type="radio" name="slide" id="c2" />
        <label data-aos="zoom-in" htmlFor="c2" className="card">
            <div className="row">
                <div className="icon">2</div>
                <div className="description">
                    <h4>Digital Technology</h4>
                    <p>Gets better every day - stay tuned</p>
                </div>
            </div>
        </label>
        <input type="radio" name="slide" id="c3" />
        <label  data-aos="zoom-in" htmlFor="c3" className="card">
            <div className="row">
                <div className="icon">3</div>
                <div className="description">
                    <h4>Globalization</h4>
                    <p>Help people all over the world</p>
                </div>
            </div>
        </label>
        <input type="radio" name="slide" id="c4" />
        <label data-aos="zoom-in" htmlFor="c4" className="card">
            <div className="row">
                <div className="icon">4</div>
                <div className="description">
                    <h4>New technologies</h4>
                    <p>Space engineering becomes more and more advanced</p>
                </div>
            </div>
        </label>
    </div>
</div>
</div>

  )
}
