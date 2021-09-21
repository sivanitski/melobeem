import React, { useRef } from "react";
import Lottie from "react-lottie-player";

// import lottieVoteSalut from "../../images/vote-salut-2.json";
// import lottieVoteSalut from "../../images/vote-salut.json";

export default function VoteSalut() {
  const voteSalutRef = useRef(null);
  // console.log(lottieVoteSalut);
  return (
    <div className="vote-salut-animation" ref={voteSalutRef}>
      <Lottie
        animationData={{
          v: "5.7.8",
          fr: 60,
          ip: 0,
          op: 45,
          w: 800,
          h: 600,
          nm: "spark",
          ddd: 0,
          assets: [],
          layers: [
            {
              ddd: 0,
              ind: 1,
              ty: 4,
              nm: "Shape Layer 2",
              sr: 1,
              ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: { a: 0, k: 30, ix: 10 },
                p: { a: 0, k: [400, 301, 0], ix: 2, l: 2 },
                a: { a: 0, k: [0, 1, 0], ix: 1, l: 2 },
                s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "sh",
                      ix: 1,
                      ks: {
                        a: 0,
                        k: {
                          i: [
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                          ],
                          v: [
                            [0, -129],
                            [0, -249],
                          ],
                          c: false,
                        },
                        ix: 2,
                      },
                      nm: "Контур 1",
                      mn: "ADBE Vector Shape - Group",
                      hd: false,
                    },
                    {
                      ty: "st",
                      c: {
                        a: 0,
                        k: [1, 0.439215689898, 0.596078455448, 1],
                        ix: 3,
                      },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 8, ix: 5 },
                      lc: 2,
                      lj: 1,
                      ml: 4,
                      bm: 0,
                      nm: "Stroke 1",
                      mn: "ADBE Vector Graphic - Stroke",
                      hd: false,
                    },
                    {
                      ty: "tr",
                      p: { a: 0, k: [0, 0], ix: 2 },
                      a: { a: 0, k: [0, 0], ix: 1 },
                      s: { a: 0, k: [100, 100], ix: 3 },
                      r: { a: 0, k: 0, ix: 6 },
                      o: { a: 0, k: 100, ix: 7 },
                      sk: { a: 0, k: 0, ix: 4 },
                      sa: { a: 0, k: 0, ix: 5 },
                      nm: "Преобразовать",
                    },
                  ],
                  nm: "Shape 1",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false,
                },
                {
                  ty: "rp",
                  c: { a: 0, k: 6, ix: 1 },
                  o: { a: 0, k: 0, ix: 2 },
                  m: 1,
                  ix: 2,
                  tr: {
                    ty: "tr",
                    p: { a: 0, k: [0, 0], ix: 2 },
                    a: { a: 0, k: [0, 0], ix: 1 },
                    s: { a: 0, k: [100, 100], ix: 3 },
                    r: { a: 0, k: 60, ix: 4 },
                    so: { a: 0, k: 100, ix: 5 },
                    eo: { a: 0, k: 100, ix: 6 },
                    nm: "Преобразовать",
                  },
                  nm: "Repeater 1",
                  mn: "ADBE Vector Filter - Repeater",
                  hd: false,
                },
                {
                  ty: "tm",
                  s: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.098], y: [1] },
                        o: { x: [0.658], y: [0] },
                        t: 15,
                        s: [0],
                      },
                      { t: 44, s: [100] },
                    ],
                    ix: 1,
                  },
                  e: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.088], y: [1.162] },
                        o: { x: [0.611], y: [0] },
                        t: 8,
                        s: [0],
                      },
                      { t: 37, s: [100] },
                    ],
                    ix: 2,
                  },
                  o: { a: 0, k: 0, ix: 3 },
                  m: 1,
                  ix: 3,
                  nm: "Trim Paths 1",
                  mn: "ADBE Vector Filter - Trim",
                  hd: false,
                },
              ],
              ip: 0,
              op: 45,
              st: 0,
              bm: 0,
            },
            {
              ddd: 0,
              ind: 2,
              ty: 4,
              nm: "Shape Layer 1",
              sr: 1,
              ks: {
                o: { a: 0, k: 100, ix: 11 },
                r: { a: 0, k: 0, ix: 10 },
                p: { a: 0, k: [400, 301, 0], ix: 2, l: 2 },
                a: { a: 0, k: [0, 1, 0], ix: 1, l: 2 },
                s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 },
              },
              ao: 0,
              shapes: [
                {
                  ty: "gr",
                  it: [
                    {
                      ind: 0,
                      ty: "sh",
                      ix: 1,
                      ks: {
                        a: 0,
                        k: {
                          i: [
                            [0, 0],
                            [0, 0],
                          ],
                          o: [
                            [0, 0],
                            [0, 0],
                          ],
                          v: [
                            [0, -129],
                            [0, -249],
                          ],
                          c: false,
                        },
                        ix: 2,
                      },
                      nm: "Контур 1",
                      mn: "ADBE Vector Shape - Group",
                      hd: false,
                    },
                    {
                      ty: "st",
                      c: {
                        a: 0,
                        k: [1, 0.439215689898, 0.596078455448, 1],
                        ix: 3,
                      },
                      o: { a: 0, k: 100, ix: 4 },
                      w: { a: 0, k: 8, ix: 5 },
                      lc: 2,
                      lj: 1,
                      ml: 4,
                      bm: 0,
                      nm: "Stroke 1",
                      mn: "ADBE Vector Graphic - Stroke",
                      hd: false,
                    },
                    {
                      ty: "tr",
                      p: { a: 0, k: [0, 0], ix: 2 },
                      a: { a: 0, k: [0, 0], ix: 1 },
                      s: { a: 0, k: [100, 100], ix: 3 },
                      r: { a: 0, k: 0, ix: 6 },
                      o: { a: 0, k: 100, ix: 7 },
                      sk: { a: 0, k: 0, ix: 4 },
                      sa: { a: 0, k: 0, ix: 5 },
                      nm: "Преобразовать",
                    },
                  ],
                  nm: "Shape 1",
                  np: 2,
                  cix: 2,
                  bm: 0,
                  ix: 1,
                  mn: "ADBE Vector Group",
                  hd: false,
                },
                {
                  ty: "rp",
                  c: { a: 0, k: 6, ix: 1 },
                  o: { a: 0, k: 0, ix: 2 },
                  m: 1,
                  ix: 2,
                  tr: {
                    ty: "tr",
                    p: { a: 0, k: [0, 0], ix: 2 },
                    a: { a: 0, k: [0, 0], ix: 1 },
                    s: { a: 0, k: [100, 100], ix: 3 },
                    r: { a: 0, k: 60, ix: 4 },
                    so: { a: 0, k: 100, ix: 5 },
                    eo: { a: 0, k: 100, ix: 6 },
                    nm: "Преобразовать",
                  },
                  nm: "Repeater 1",
                  mn: "ADBE Vector Filter - Repeater",
                  hd: false,
                },
                {
                  ty: "tm",
                  s: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.098], y: [1] },
                        o: { x: [0.658], y: [0] },
                        t: 7,
                        s: [0],
                      },
                      { t: 40, s: [100] },
                    ],
                    ix: 1,
                  },
                  e: {
                    a: 1,
                    k: [
                      {
                        i: { x: [0.088], y: [1.184] },
                        o: { x: [0.611], y: [0] },
                        t: 0,
                        s: [0],
                      },
                      { t: 33, s: [100] },
                    ],
                    ix: 2,
                  },
                  o: { a: 0, k: 0, ix: 3 },
                  m: 1,
                  ix: 3,
                  nm: "Trim Paths 1",
                  mn: "ADBE Vector Filter - Trim",
                  hd: false,
                },
              ],
              ip: 0,
              op: 45,
              st: 0,
              bm: 0,
            },
          ],
          markers: [],
        }}
        speed={1}
        // play={isPlay}
        play
        style={{
          display: "flex",
          placeContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
        }}
      />
    </div>
  );
}
