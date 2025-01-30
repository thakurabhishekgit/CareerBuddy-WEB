import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Placeholder image URL (change this to your actual placeholder image URL)
const placeholderImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAxlBMVEUAAAD+/v7///8Ab0QAckb4+vkAbUEAaTrp7+zx9fP09/YAaz4AYi4AZDLm7eng6eWeu6y1y8DY493N29QAaEDF1s2qw7aUtaRdkHQAYz0AWziIrZq90MZrm4MAUTIAXyd1oYsAMR4AFAwAKRkADQgAVxUAHhIARisAWx4AUAAAOSMASgBEhmYccEYAIxUndk8zflttlHkAQAAycUZ9nYZBeVQANwCitKNRfFlVhWVEckmMpZAiZzdjh2dngWYSVB0pXigAKQDbBNIBAAAgAElEQVR4nN19CXvaPJf2wyHGC2DLci07kR3ctGk2U3CBIZRk3s7//1PfOZINXsgCfTrpN7p6tQ0Bo1tnXyT9888fG9/Oz/o0zJEP0Ov1wJZjU71ydvnnvvWPjKvLM8IyGI6zHkEhNMA35lChObv/+tETfP/4+kVB6Q+HeQAlFoLTYzNzoOCcf/v/Bc63SwVlMJxF9h6KJk4xVbx21r+5+uhpvmd8u+8rLOa04NDAouCIitfOP//1xPn6+UJzmLkRThuKQmNlq/FAEefy+0fP9vXx/WagsIxn2y5ZKjhJMTSVHjj/m3nt6l6TxRwV/gtQFBw72mjinF1+/ug5vzQ+XyppGYzmzHoFCxEnkNOxkpxPfydxrm60mTTNbfgqFE0cPx4PFXEu7j965t1xf6HJMtn49ptYiDheNCuJ87cpgqvLT1rwp9FLgt+B4wTpaFgqgo+ef33cnCuyDEdxeEgfv0QcS5SSM7j48tEQqvFFc1h/NBN2791YCI7hZtfKv+n/LYrg8pOaznCSekdBUcRxAnOkPt4//wuI8/VCz2Vk+sY7paUFR97p0KB/8+H+zb0y+cM7dPWPh6Lh8NmtDnQ+nDb3pMaGffdEKApNj42UQ/DhFueKPJgROxmKhhMM/wrK/EPBizn/LTA9SCYqYvtoLP/cELvf/R5lDEFgLj9eO38mobm2fwcNOBHq57OP12Y6DXPLfwuMLcd/g/yjoVFggt8CY2V/CxhSZ5Pw/waYq3+BMn8Nm/0bMvPXKAClze6M3wLT+1tUs7Izt/9HjCbJvxn/JphgRv7Mh4fPX0hkJuI3wbjp+G8QmhuKAH5PZMjTZBMKNz9YaBRhxulLycvOeAlNMsMg4OxjU4JfVcL/zjuYVcYoMmRZPhtOJpPxNE8j33sJEFhLSm18+lA+U0w2ytpcRlP2ovnDbS5FyC0bhxf4UTr4MUn93iE8IKhyc/aHc07fXtOX9zod267CAITxnSmDA3xm+fGPkeQdAoGtSHP2JxXa9/Ozs08vFVK+Krr0bxt+GYDhyus5ZTdovmA4jmOr/xhEP3rVjYZPkWc08YCvtPPZq4z29TfY8OqeynlnZxdfDqiZr99Vyn8wjmpMBj07jJ8im+Zs2A70QJqj6wzf4MlculBpBVdO48Sqp3MAIlUifEWjXd2cn59cDf2iCxQKzudWEfLr9xudWzazPZNBz/I3eaKW3OZRLghM7Nk4aSsu/M2S3upRKhr/JM8b4dXggF3olNMLjHBFfhPO5PspcL7d64Kxrqiefbr58uXbFT3o69W3L59vqlqftGC3tpZfxKFmL4NdFwJ/BSwOSYmFKwsFKQDgkyx0Nb/x5YbxPRyqRuv8WVdwvn4vSz/9s8HN0V5PVc4zp/Oq3n02uLi8ubm/v7m8+KSryQNzzna5ZdTDWZzQJC2S7+DR44kLIKbP/52AwQrQYIoseowVGKoELGO2T7RDoNGcnd9/qS//12+fb87PSi7BX18cWQ0ty3kDM2d+Niu7EQiQHvpHcxgn+5kYfi4c/NFFTD4iyvN4iRP15yTpRoRgWOqC9Z8Ekv/g22ytDvgS37zjtKDQCbSz85v7z9+/XV0RE9zfXPTLUvy4qlAdQZwdWcwlco3jy3ysKkP1MRybMaul/nDxY5wfGNvHSFzj9NkjB1QB4VjJVLLy/WdhgFyl63RLGmDtKW0H86ymBdytaZbL9uni4vLy8uL8U4mkP5zMo+XYPLJC9e1GF1tGc2EpbjACls0nI9McKgEaDM3RZJ4Jr6lbrYwEvrdMLf+HIJ7x10UI7lqRwI7iIrLAWvjJKjcQal4UPsIEPqxbXDDEZmIeYIOBOcmjEB+Ta9p9unwXcb6WNTBzsqzaK0iXhkKm+QxRTMb9PEbD3ilbQrBEtwbcPE39uQA3zpdq9UHPkpOsJ7ENuUTuWjBrTZVPWDWzB/grlk/GgwYXIBJkA22Dg6X5fuJUNbDJ3K8bdnK0vCBMaIQBqdduvwJfbYnR2MSFdI6zD1Q9ENQcyr9c3nP+ywU7m8Vr7pAXcyed5qOgx0U2nYzGyAeD4dAcjybDmCWe/kYAW+SqCHLWf5M4aNV1PU8GnZV/1fuFHiskKmbUajOWTQXU3t/bfYh0QYJR8sbzke7ImoucbVpldlIi5Mjls+lgNo+zyA/q7gKuUlYS5/wN4lzpvpdx9J4qa30C4SYLnCgl0xJOJC9dFzuJ0ufnzeb5uZC+VeFx8qcAbJKY7I4bYdrpS8EfHcvjODzPclqLh0/1V6OyyeN1NPfagiyOyR2hwcjzEOFbhdIBXBt5W2w2GQu5GiGTm5UsdYbHpkq+gqeM5NHPl52SyKtcYLjZVKN5nTYln5lP1nvR4Gziga6Xg59zxVT0YrGQgWUb1bQM2+LRap5o9zOgD0AxtpRUeWwmj2EFXKhc24q3GvFU8Ng3Z+96NgUu8ZiVhVmApXR031/8JCyjvq4KkBPmE1/7ZiT9t0n5sZ4rzaXzbjjox2m35NObCvqbMpmTdxSQyMFajZlTygL+5a0UaeQDO8QgKmibTbyy0fE5rhQmOUHyrngnddCYaVfg/B1JA91f+fDGk2mlxdPC75VQPOU/RrkF3l38SrgP4XVM7iXIST3cxk+wu1n4SqJg/06plfP74lJVdR3JVxqT8BsNnt7GvPpuL/+PUKCe/eiho9bbk/mFohP8FM1SO5nE2bV0ewcD69r7hHLl353+0Ix2+JFamr1othAVfxFfZY5B4gL8aX6Iv6r/6J84Cvx24zYJA7qSPp4LFQK9SFoU0v4xefbP1Kgw8g8yfc92gyhfRJVNNtzE63lPbhArKQO57GbR7FI3glE+x14uZg3tb3uuUQaiPFtgZODavcN6WefYjsl9kNQMG0nXUr96gS83Odt5F+jk/3wchSgAM2n1DHrpp9+gA0HI5jpkNlgp8ohmXQ+33Wwx8w3tyBG7ycdYJtw7AAh4bpLsHxHTXJLlfNo7mkQQj4ciSjdL394hsTzDeGQQBuCsGHDBFaONSzoYFR2MOE9VVkPsUmx+2pB+kXtijitkV14CeKLYZJEIuOvUbaeuGByXl/6CfDaYBqX74fIgEUym6JN4vR0SgztJzI1H0kAe+Cu2KfQH5EaLhie0VIC98uSa/P1iFJS/ikV9xSF8ZB550duEO1AtILmcRSqZSAJeZT/wk+bR5Q8SmiEjXzARUSSz5VZ5/TsktoeGP7QKBssM45MN2Gmh+ASMUP63fpc/9ssJLDCItPAtfq49foQlgx2bkYeNa4HT5dfLeG1VdFBf54Vsu8xkFAn1MAhUEue4/gfq7xlm5D/lBa6MtSc1IXGBP9sWRryicPmM2f4D9Cz1HoSSomAoN4UtMi0qUYpCgW/OEE45SS/Kdn12KEBbYHP8Mc0hwSDICmtpEtBuNCtM5QiputTFcUkNEpohsgvY22TPsvQfJ1gvn33neelIhkT3IcmLOSsjllBmpOYM5Ueu16lQxFqgLLG1i4FnJojtferiDKJU8lIh+s/bGL0ze5xv0dvBGI5X6mWPSEYExkrN44sf9wRmRYZayJrTwRPXKgohRuBtmMCYkbz+QCTa3wqzTGVbwHgg/bwV/JlAhQtSeksZGSAZ6dZppqNxDYdioGRNCYUoDrcp/mKttDuo9E5FIXvqKX9JuctHlgs+KzAUc3gk1mpt7AgVDIciAn6HXsk8W6ISTXnlqidpKrhWrsbtcg3GVsA6Q1208AnRjMKWKELuy8VG6ywjYCqFQ+xJBnOR4deB0g70lDRH1VktZJQqgMEt6eUjW4a+k25eKVUrIwdcWSRgxTG3kFRxkV8jN/i3CMbwHK3yRIxQKpVj/CL+QzBOjorbpMUP+ozESIKYeW5p/Ekj4tNCzcdIkfwxsyjQU0SApzBYh5W1XSlNeVop9+suRAOOHPycsQnvYYhbrB37ccv9W1xIJqrgpRc9pom781rA/oWS5K7XuMqL4JdaEk8Qx4koHLuoB4Md5xqeH2+EWgVwvDCz0aPZqqcGk4g7pcoDoQ2VozoGjq58EJiZijcgY+4vVFD4+FEcISNlsgfo4/eMkihe+iR5PccB3hMu85bAQPirKE2o0tbxhNPmhn1OBj9lBZkKzhQr4+NWt0WC/2Z5NkkqwmwCHTakJ4EZ7MHwjZX/+rWQ2tQZ6MNb4DqgU6w9fzXznWZTI8oTzimbUYEAqu5gbXruSH6sLGl6So7HViiaZWLKDjL0D+Bn4lgVYViqlDVY5Mu8ESy/AGZaGr1MOoEvpokRbeRkxXtWbxfEpLcFS/uU3KzPzke3DvyJ0oMNS8/J7T8Ahidy/HArK28GyQjhnbVTzXZcGluLqjifjq59KjC6JA7BnEcAeYQ0SRNn5w460Wihq0q2aHjYwDKVqd10ip16sm5a95hROHIpAmTk6GHoQymFiKC+OPpJ4FJfyu+AAdgIeJpcLyqPT/3tsOmddJOMJV7HtYWIAjuV9u8dGODlXpMyu8HjH3lilF9Te0O5hwVcpZl/B4wfo/EKg53TbyCLz+8yMhCGl1BBeZ42kjklGDAO9wcAf2zwnsFD3xcsktJQ5v82F67RzIYEGj641yeYmRoYXJZkn580bCuI5k9ZVWMtX7absxUZVDx1aIiiAd0W6EUmIbrGJZ3CdLqJuGXvAUGhYmzwfgMMSQJQ6KGBWF4g0tWmCs3Umgbco9FkszB/AYb6rZO2YljDMQxjryoUv0WPeSa4VwLCkMzdgbk4uiatVDPpUWPpq9AsCFm22ciwnvd1EuSNLE3juJGbAPfpJaL0VETQ2MuBT2GCSBMG+9eI2n72SPUGjKDxJyQNMehpYCqjiWLsBxhiZnERJRY0Wacmuo3pGrNXuulAZq1fWjwIE5Iao/E+oNStxPAs8kMulKN4GhjlzlDOAf1CDM1QdbYT2GpwX1U5Er8l6vLlPBXwfjP1i0FF4FlGZ0kqQDaGZ0Umx8HJYK4UGFrfwA+sg19EFAgjGsglzU1AwFcvdTqjom/lSlEBEJvhCF74hArPlG93msx8U16z9l5f5v+djnPbi51Fhz+E0cxzN+NvuJRkYMlL31MGnKdqsy8qnmmXAjoG3eaUImCMtWSkMgydSfXY1G0/1I1E0JbGw194op3RwVlnB1n74R6pISoMtmQGDLY8sM8JVWPW8QpQbaHwS4mRXRdL67HuKbHZPmxuPEqW/t7uFcdSrrubtDaY43uLA72OsF226YJWhvJlqPn9qJ7GUP8w2X7qSb7ZjQbT+lqhMg3g7FQo5TdYmiKfdIimGjJawzvAfGCIVIZKcIzdS8r3B3/gtcFQ9f5oMFTbHLbteChFim4axLvvwAiQhZwUawdMT+Ra1e2GwFl3vTVVx8YFqe1Zw8iVvOdw7OUtxXJaCKBSTa0OX7CZXG8d9NVqL6kCqsXmWUdH8dictsaoCwYM6ZOnxEXu7wluYyzqPXmzlrIGaz48ITirkoAtNJQcWvoN7xw82ccop7MXUCdS670Jg/74EGVsXAmLfHGj/mLsZmLQVhYnRprnBKYtfsgR28VU1INHiMxUuWte1FJ9GG3fjlrjutPOiW+jNGieB3XVTMSO87ugra4Ro3nCFgiVa27qI7BlAm7MepTK272o3RB/kHeK+ZaI2kMmDe9LvU2aNGcrG9eSHIHk4C6Q/VqKHNnvlIQGgZm2PHVknNCVAbC0XlqhpswRoz6ENmkOjjYWfFSaB63YB/zMBYz7s1bH9GmppqtdSaMxO576MvTTRlcNj0kHG14Wt0yI7Xmu63oWhTv0H/zjuR0sM26AncaBU1eHAEI6OZdtrYJgRseD+a7AtEIuw6KZZyittTkBdQXZnsx1B0nt3duH68744bbYBoxcWpTikHUljE9ibJ6jzLbeb1AN8Ni8ORU1B0+thmWPkuRzJICXN/jM5ozqLjxqFpB0ias5mlugUNYSA/yY2mqseuMqRjbARhIgyVpgTknP3qvsbJvDk8x1sgTJ00yuCGoz9Xz8TW1GPUgGgy6YRvHP6dkpxuCOlEGjnwGciBnw00acbe2X3B4P5kaDaT4IeokMZMjTposMgep9RNUcsFp3oN5H0hzjvI4WXGFDhAoLgo7WkgJ+Wn7RMV6qCnBkrUm5Zp1NvogmiyPZ7agKI1RytkAXy9urNAhXY7MxxsOwvvyGEaGkBJlvg90KNsCS/iLqbmUHfnt8dEbeTHu/EjiJBf4KfU3eiqIA1xGtZuSCL+yah5UUcWNs2J5rKA3qgsg8nHf74A0IQvTQTYkqug1SgTk/Dgx5M2bWBiOkbacCvKwdEqL3mUgfvWrpQbJvde65XmPwGhbLMnyJUoFOmOEn7SlLcs1sxNoBMzk+oKGmBrMd+aJijFyZUK21I00yQj5jGJEwVvN+PVa3/36NBdE35ThXA/UVmuaOueVZYCwMkXWiUm4OMKA5AUw7unIch8mUoZdrd7wS5AdLMgsE4il2ecjtaLwfo/G+xMR9JCVyWYr/le21IQniWZJHiKUd83l9CmiOBzNuEz9YgsNmObJT3Mm9oGrKUF4ESrRkYJWJaX/e3/v/fV1Dpv0PNsWsDPWfiPGD7YANrCikBgh8lt/2dT0KaAZHBTRqj++o7c1gOANWik4m9fy3wTjK/tFqo5ufWyRGFHbVh2WoqN5GBQYYZxuZ3+uJg61ppKrDuQdh7rbBqIDmKDBfVFdTZ8UcFgGy+OEzsmw0k8gXAcaiUYReHDj2AT8TBSrvWajdmQCHSCUOJNhQ12ceuhnhvP1LcPPTwEw6T8LgLJLhVnTUv/5tknoYcHCw+uCgAIvE8Lws3w3RQ+dO+CAYzhUlLMC40YGO9KlHIY3DNJx12jYRjHksGNVvNmnzUhKhZTb7woD4YFKsh8tOdfCxDTyHUBqJn6zuhgMaw9HDIrAz187BmCqh8CMbje2hc3fwo+ho5v2pg/FLO6ORHx2d3X860AmI8iLAKtYGlZsPD2onIQVgoNAgAVBPpXwxUCGzpCQFkm0AvSghB5IY9oVcKTCUuwjpYtx1MljHg1G7rycdIbdSH7Y+yOzQeqp3GCSiJDyocS0bbU9sazBTBgw/GRCT2XPUJT6Sp5tDKx8DEcNnGEZna+6pYAaDbu7BS8OtL7KXj8rCtd7gYo5RhCUkwvCksQMjBL2CTOYgpoQ2NLz4mB4sfV9ao25G9UQw3cNkeIBKKqcwKnlpTXWwzNDSoGODCgvlfQcmFLaV2TA1SNUZwWGxU48g3y9L074LVniIzY5TADc4AbOdAlRxTLDC4CzIXzmahTqWqUEIXBZQQmIHhmOAkJOPgEhfJ4srUfMVYw5u3E5DnKCaDznNhKbwSGaC+I0j2dCc+Gj1mIPyvwdjoXOMPxv5223Y6MqigwBWG0tpNI/zABSYzl5yA+2Du/V54cKbB8xRdtUHDz0CDWaGjh66MH5Csdxb56AZFK1FwqNCbtsDmA6P9c0IzLit4g0f/XtZSDTfQbfl+SAiHjp7MOBzsKmf/K1PGWGI+iOWmcCYpx0CHO81HwYjcJ2TeY7BWZq8A0zZy7EHo197xwhxvcL53AfqnGyGbfz4As3FATAKjQXbNbnn75qTRrRns/d+iPS6B2kERsbahvuEHADtBeiCQUdTOmvf6wZn7wDzPsYsP4OumZ35BvJZJ0F0fPPsQTazGaJhyy3Gx/DKDo76nPZsNk9eK/Q2P+cJB52h3CcszSQAxrqU0bw8Kgl4EAwxsM1mtNd/+Z6dQoYXJCJik9vReDSZxMIP3BdK8K0PYvhtGAK/CN2aZg3kpMT5ITCU/kHa0IaEjB1uV2q8m6dM+CGPA72DLiBkWRoFb+MBJxJgbFgPoqxdOTuhPqPAtO0MKDRbgVje3h6GipzZtmFAalTpf8O2PC9gcdopu7Q/i0zgw3OAHm17R+opZcBDYCjYdaW/FhKxvObPVGBIeoHvD3LQkBzLo2MPXvNm0Ee1s+DZlZkBrJmcdvuDo6vNhzwA1XXhyiltmEvflhkI44QjHewWW1HobIn8FYWohTMdz1FeWHMS4I6PL50f9M1UcOYWW0f1Ar/JZ872x2Se5/N5KrwmIPzBlvFLR2/Sb8n2PxKWlh+n+wCOzAF2veayUdSH9RooB8zeog36caHMY4F+XChnedimT/AScfwI8IsSeHRB0GbRxjKc0qGhgrNp/SmGS749T4O1Cs7Yw1tHZ0IS0fwDOZ9nIhSrEWvuwgQjPaQT8eVb2mOf8kfPn9MT6jn1k3pn7lX9oQ7G/xHRBrBApjmqS2nC3RuMRmJcDjtI/ATFJ2y2C0LW7lGhV+08jJGLw3RAPIZxQ/341NPADFo5APDGck497cEstnoZLtnsja3cFGHpxprKFUDeab5DbZnofOwnhmQoLv40R2ThPK47tbp57lgw7ewMwA/gecYdWAs7ox2wr/T6lbOK0kzsWvzQdtg8a1WpEE2nS4VSnF4sHWNjGTx9DKz6TjsIT6g1dZOAQAU89hxZkcxSajoP3tjJjVGyjVyZsSQIArT/gS9swVoNg5B2Wp9UQOamEY8TtorobpS6ZJ1S0vyu0rP1dQQ6fwXD2SweZvrspafX7SZYTGkwLqSUEf5JrB6knWJ83iKWYartalZWzGJqQukltR5oXM7J0X6mTpw3qgBUfeipYpiucaPWeePsPKq88EZnAymFdiXGnTfbggPdFgbWlo6Jwa+JauwMxiltALo+Uzcl4E50pGhXu0CS4g0wgYyYPslDFwSoc7GT1wXRkL2dbwG6Oxs9gbr8G3r73JFgVBmw/jUAd9Vu0Ardiw2yFRjheEIwUTWb0UkBPmu/q8F6ANd6l4pSgZYwwKr3iYKjnOZjwXT9GcibsaLyOV4F49LOQLVpIcE/gaf2qnQ8VOBxrdweUrkevFA1UYsRVGxXfSc1Ag6ObWpSLkCjq5F05n4B6SuTTk9va4jIaTcBdd0g6EX7RYG52n2QrJ6Xvgsb/MaowR7W9SktmrpDo3HykFXZHZxVQLkv94XtMft1jGKZlBWnnsVpWywYswNNdrvt6dad3gbE/SxfFdcJGPOGSg1O6AKoNmo3HtTbhJqdbfH8NKN5se0bKoCJwJdxnOKfTDIVzkPSccYNUZEGskx9hcVtww0iVHS8sUMC9F7go4/b7PabqdiCkshPsyh4INIEL9Sc9p/ApbVcNSzLdvSL3ZQrT8vOX6VkwN7++s+vglMTFTrojSmoDMDx96RRW+OgqTVdZDtnPU5D1Jpz2iFnyxd65KtPhJHVrmkSo7Uz+zYrj2yJVCiWLHyHx7dqq92oaVNPUmZl92wzoqE9PCDmFME7k0yzzBuk0RuvquGrcBn1a7seHpYbof5DUuVI6iMANsLojY+afraS/+MPqdZN2s08T/KIru/z0uXZw1QtsrNdv5GZSGbzFEc8V/2rljBTolW7h8SL1A4KqdtRxZNq2vyJHkDe0P4n+cw01N7mWSubQC2u4eLHA20SYiG8vN+vBsd9Go/H5qgoqcPzqd9ONiHNaAu+u1AaAuzlNbpM0cQF47+a8Zw6cPvihOMayToNGjKB6kupAEr/iNtbCgNhu34jg1zueTerng5ioJn0ml3QVJlGV4ciT4zkPMdf3d1NfNrs2gStSoCn3JN40c1poDtOLolhs+GDb9H5R2i+38ghV2CKneUnMxXHvB5Eo4cdqA2U1LX069fKR0tDftNDM66Guz5du3MCGDobbLhpZnodsscgzJUYCYhoQwo602/ogApM3TlGZpMyqL0CQljPyoyNUsdl00wdKrZtNWjyk+w/jauzbu4el5STnuHAHnqG2mne20avpmp3YBreBJcQZGx/kxAkLIvU1u8flGAPpnR2gNU6lkxbmVNEBs3mWWc3AJHGAOMZZ1Z4qFBVUJj7r4kN8MNgaBeH3GU40DVSTGZDvqF82naJ67SMWmpCHRZ52tWidOavuWktDk9RYYa3SB93Pd2qzTRh/tp1DTswjR5sT5Wbg6rTjGI+kkZ7ya3nTcLDGMkdPLa+O6Czs07isn/++XaIz3qMtrmvObrMG788idHPX9bPaGlKbWY1wKjmDAyO9VkyEOgdx+5yFdhyE+cpByf2W4/Kjj3WqD6Iz8zWzjE6+pM8wbW+lpHON0Kv4PGlLabQ8zf6INFZVmsqVaGOeprCCJx2LgM+yi7QCnGfmrbXWatF3FAHOp96ga3ms/Y2v5AOKbFHypMHa7kliy5Wh9HQObrlHprBuEY/jCHLY44CtS22UGdoLDPbec6na+UBBW1zDD496bgOgNq4UvdktXeI9iTpzeRaqIzQJlHxlz8/KDcQzvf7gcbxDjFGEdXhGOR806G05BzMi3TlJYutS6F/K3eLNpUIc34ilvIyhqLdWGiTpYbo1kYbOqaqI6Uskrnohp1gLOt7m8a7+YHh786TAf8xoReKIuExHSUYko5eb9u9WQEdtn+Cx1yN76QCBt2Oj0fqlw+NcBUvN1yMQ2XUc9nt26yOk9bDrPnYSZWEgUy54f5Mpn7Plr+Q4ET4os23kKnzGU8/5Fxd+jPu9hYHP0lQ+C/pWMvF1Hf/mwydt3z2WsRBetVPRh7uQ2DKqiso1kq50fZy69gOtdzcMSUw7UYD4Kvhb95f/ZlIY3Y6GEDQ4UtOYIBVLELjeaXPtxGzFquVJ8q/CIZOxBNK5pwtnaJp5QZpBPDyTi8DKIY9+537Kb59UpdLdEgDsq8yW94KlV0xrc4q4kXR3IsS5nUwtQcpMOBuUDOjQcFF8HHJwPmlDjqyYtndnEFPOrv4DSyaNP1JlzSQThVzPFuwHO93oAbNXDKajfqmk9taSilAEw/ejBoDbmdRzlGh+BDcUWbBibtbPmGrDmj8LSz6sNPhgWMXIO7rYGu7j9KBSoTNd4npnjSjml4ETvuYgfRveE3L4gC7e/gRU7SUxx29qPn1t29816Rpp7vp+emMlJgY1kxh0E3yy/IocRS9TT0Nq1wAcPvIZpM0vX5YhGAlKruQp10sVjgqdmsAAAXdSURBVPEvEKY6v/m6axJxnqvmyeBImCV0BJetBuYQx7Rhr5QLgIMknU83LFgudfLTPuvwGD1EYfn9W0NUu/ZwdmCzOLDHoHGBhLeJfa9V9qei5Ga12qTN64+V1bQ4i02y/bbtbCkSRWBmdMD2BkefnPnSuNH8fqCUCkn9PnM0fEW43GQJ7xxtbDWPYVC6WEg/e5QeRshgZ3mszlFxksWBIBzcgnz/f+WCSn3g8e2hFQMey11rgmoSANsv1FExVSWzmv0OBaiDDBK2fF6S5xCMgS4JoCO2Mch5PuCvghGp41mPLJe9MNRFZv3rQ4kLDECWSeVwJbGKe8FOZJFFLAmr42P3w7EQh89ktowCdRYPwMovq9FGkGaHNmz09DU7/9a9Yar0PDh4/R85iJG+esGuyoLKAfblMpMyYmvhVyfTCMEiOj9oy8I92wGf6LPdvag4FH5jDDozT01jHBxKbIb9g2gwnFfRCAS1vS5qqS2eCLbeyt3YRqw8Fb8uQHQKDTj+srNhUv86WCm7++/dGnZ1qdDMkoNf5/jpMgQj3acfMP7cs5Zh25Zl2fYu6dzK/3mmAyFy68FOaYoy+v/yTXtaCQzbjmRFBk+kW3+xD/KBPS/pjE9oioz+iS2XzUpJlslUtB3uJpYjuxjeQnOu0RxuZ1QXYCxrrDMt1vOtR3stfVudFwY2XRvgrAO0f+vtU6Mm740lP5ysgkBjOXKP6XvRTLeHt2dAr1ZIAeOB98RzOE/Az61i9fPnUiV2AZ4j+JkZtt/Yrd3r7PqvlihZaSz/+hXImtMGw/iwnIa15hMI71iQFmEeQJTbPxnn1wGn80VhmfUWu2sB9qSZH1oh8oRUDHPkpsx3jasSzUwc0qDzmhxA1s9vZ16y8WBbGD+ZFdx6njLxMnYWFJV5zVMQouWBJ4JUHvc77jE4ZZTXmg2pOtGON6zr+uwmzLAdY40u0HLb20yur3NcfTKOYm5JNPnez2YM58WdiB+8wtS35vypyw8/6/u1zHEnqs2G+55d4P/j6kgYjELAT9EzxsLKVWy/8Iy73J81GhXoaJR2PzgGMPq6o09/CMo/1Oyk70CZDFvXGAB7yHf3HYCq6fXEk4gmAVA1bxjZseSJ5+IPbv9ht5eIVLUXP7Q7m8BKJ/qujN+Lk98YXy/Le63uZru5V2s5fBJ22buhXrHl3R2q8sfbyd2TbRUYSG6tLOxVDoD624tuR60trJSiGavrJf74vYf/fD4vk2DXcWD0Go49L8ZxYjm9/WxphDgMahvdwdBvcOxALobSgjaUIL/VF8V9+vPXuH69+VTCuc2TxjURtKbPU7Tm1s53qTCVAMoXHdvlIlttohYSKs568XWZOPx3fP63xvcLLToIZ8boaO26g+kk2U+MaDh395D2fppjuR6nA14fs/p5nOWHexZP77Tg90+o9p84PlcX6g0nZpo0z50mmRbZ8yZTlxME5R4N2qWhLkrI4ueUhd1jLNUxtultmZr69L96h/P97n7A8e1MajxQw0MnMDNZFEWaphkO/Ad/kAyDaugAUaF1QPebVVD+gNF/Hc7leb+8HW58O5dJ0A30dQSgjmiq8Vyv10Fiq6vNyov0Pl1+xL26ny8vdvf2jSfzpUiqizZ6HUyHUJS/tgNBlw9WV11eftTtzd/25EE8o1kR6X7ZA9N+AYkVsmVujnTe8+zs/PLkq0z/hfH1C+KpbiMcmqNpvNXi/Q4gBhdRMR+NdxcbXtx87MXNOK4Qz6f97YrjQV7I1/EojedHy810d7Ul8df9h991rsZVnT6D4dhEPPwVKQmjYjM3x+agQjK4vD90ae9Hjavv6m7VSoBMpI/ohgpAEXa8WQ3MCoimyd+ERI+v377f7/TbYGhOV9JqOqMQyM1qaprDHRAU+S/f/zok5bi6+ny5xzNYZDvqUBZ2tRhUJQ51k+nFvb5w+O8dX79+udzLT5nWp7z00w6IIsnN99+5IPt/c3y+qOCMTToB2yomNZKc3/wBf+X/ARVQXhfiyFR1AAAAAElFTkSuQmCC";

const SchoolAdminPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error message
  const [selectedStudent, setSelectedStudent] = useState(null); // State for selected student

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const schoolName = user?.School;

        if (!schoolName) {
          setError("No school associated with the School Admin.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/api/v1/user/getusersbyschool/${schoolName}`
        );

        const jobSeekers = response.data.users.filter(
          (student) => student.role === "Job Seeker"
        );

        setStudents(jobSeekers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Error fetching students. Please try again.");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [user]);

  const handleCardClick = (student) => {
    setSelectedStudent(student);
  };

  const handleBackClick = () => {
    setSelectedStudent(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (selectedStudent) {
    return (
      <div>
        <button onClick={handleBackClick} style={backButtonStyle}>
          Back to List
        </button>
        <div style={detailCardStyle}>
          <img
            src={selectedStudent.image || placeholderImage}
            alt={selectedStudent.name}
            style={detailImageStyle}
          />
          <h2>{selectedStudent.name}</h2>
          <p>
            <strong>Email:</strong> {selectedStudent.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedStudent.phone}
          </p>
          <p>
            <strong>Address:</strong> {selectedStudent.address}
          </p>
          <p>
            <strong>School:</strong> {selectedStudent.School}
          </p>
          <p>
            <strong>Niches:</strong>
          </p>
          <ul>
            <li>{selectedStudent.niches.firstNiche}</li>
            <li>{selectedStudent.niches.secondNiche}</li>
            <li>{selectedStudent.niches.thirdNiche}</li>
          </ul>
          <p>
            <strong>Social Marks:</strong> {selectedStudent.Social_Marks}
          </p>
          <p>
            <strong>English Marks:</strong> {selectedStudent.English_Marks}
          </p>
          <p>
            <strong>Science Marks:</strong> {selectedStudent.Science_Marks}
          </p>
          <p>
            <strong>Mathematics Marks:</strong>{" "}
            {selectedStudent.Mathematics_Marks}
          </p>
          <p>
            <strong>Overall Academic Details:</strong>{" "}
            {selectedStudent.academicDetails_Overall}
          </p>
          <p>
            <strong>Hobbies:</strong> {selectedStudent.hobbies}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Students from {user?.School}</h1>
      <div style={gridStyle}>
        {students.map((student) => (
          <div
            key={student._id}
            style={cardStyle}
            onClick={() => handleCardClick(student)}
          >
            <img
              src={student.image || placeholderImage}
              alt={student.name}
              style={imageStyle}
            />
            <h3>{student.name}</h3>
            <p>{student.School}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  margin: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  maxWidth: "500px",
  cursor: "pointer",
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
};

const detailCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
  margin: "auto",
  textAlign: "center",
};

const detailImageStyle = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "10px",
};

const backButtonStyle = {
  margin: "10px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
};

export default SchoolAdminPage;
