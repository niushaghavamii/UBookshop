import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import css from "./css.module.css";
import "./css.module.css";
import WindowFloat from "../Libs/WindowFloat";
import { Block } from "./Block";

export default (p) => Component(p, Page);
const Page: PageEl = (
  props,
  state: {
    form: string;
    book: {
      title: string;
      author: string;
      country: string;
      imageLink: string;
      price: number;
      language: string;
      pages: number;
    };

    cart: Array<string>;
  },

  refresh,
  getProps
) => {
  let styles = global.styles;

  let total_price = 0;

  if (!state.cart) {
    state.cart = [];
  }

  for (let title of state.cart) {
    let book = props.books.find((b) => b.title == title);
    if (book) {
      total_price += book.price * 0.8;
    }
  }

  console.log();

  return (
    <div style={{ direction: "rtl", minHeight: "11vh" }}>
      <br-x />

      {state.form == "bookspecs" ? (
        <WindowFloat
          title="مشخصات کتاب"
          onclose={() => {
            delete state.form;
            refresh();
          }}
        >
          <f-c>
            <f-15>نام کتاب: </f-15>
            <sp-2 />
            <f-15>{state.book.title}</f-15>
          </f-c>

          <f-c>
            <f-15>نویسنده: </f-15>
            <sp-2 />
            <f-15>{state.book.author}</f-15>
          </f-c>

          <f-c>
            <f-15>کشور: </f-15>
            <sp-2 />
            <f-15>{state.book.country}</f-15>
          </f-c>

          <f-c>
            <f-15>زبان: </f-15>
            <sp-2 />
            <f-15>{state.book.language}</f-15>
          </f-c>

          <f-c>
            <f-15>صفحات: </f-15>
            <sp-2 />
            <f-15>{(state.book.pages as number).toLocaleString("fa-IR")}</f-15>
          </f-c>

          <g-b
            style={{
              backgroundColor: state.cart.includes(state.book.title)
                ? "firebrick"
                : "#3EA043",
            }}
            onClick={() => {
              if (state.cart.includes(state.book.title)) {
                state.cart = state.cart.filter(
                  (bookname) => state.book.title != bookname
                );
                state.form = null;
                refresh();
              } else {
                state.cart.push(state.book.title);
                state.form = null;
                refresh();
              }
            }}
          >
            {state.cart.includes(state.book.title) ? (
              <f-15>حذف از سبد خرید</f-15>
            ) : (
              <f-15> افزودن به سبد خرید </f-15>
            )}
          </g-b>
        </WindowFloat>
      ) : null}
      <Window
        title={
          <span
            style={{
              fontSize: "23px",
              color: "#2C2B2A",
              width: "100%",
            }}
          >
            سبد خرید
          </span>
        }
        style={{
          height: "100px",
          margin: 10,
          width: "calc(100% - 20px)",
        }}
      >
        <div
          style={{
            height: "100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* بخش راست */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/pics/cash3.png"
              alt="Icon 1"
              style={{
                width: "40px",
                height: "40px",
                margin: "0px 90px 0px 10px",
              }}
            />
            <h1
              style={{
                color: "#363434",
                fontWeight: "bold",
                fontSize: "1.4em",
                margin: 0,
              }}
            >
              مجموع قابل پرداخت : {total_price.toLocaleString("fa-IR")} تومان
            </h1>
          </div>

          {/* بخش چپ */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/pics/bag8.png"
              alt="Icon 2"
              style={{
                width: "60px",
                height: "60px",
                margin: "0px 20px  10px  10px", // فاصله 10 پیکسلی با متن
              }}
            />
            <h1
              style={{
                color: "#363434",
                fontWeight: "bold",
                fontSize: "1.4em",
                margin: 0,
                marginLeft: "200px",
              }}
            >
              تعداد کتاب ها : {state.cart.length.toLocaleString("fa-IR")}
            </h1>
          </div>
        </div>
      </Window>

      <Window
        // title={"خوش آمدید"}
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}
      >
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre>
         */}

        <w-cse style={{}}>
          {props.books.map((book) => {
            return <Block book={book} state={state} refresh={refresh} />;
          })}
        </w-cse>
      </Window>
    </div>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let books = await global.db.collection("books").find({}).toArray();

  for (let book of books) {
    book.imageLink =
      "https://irmapserver.ir/research/ex/books/" + book.imageLink;
  }

  console.log(books);
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      }),
    },
  };
}
