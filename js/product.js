"use strict";$(document).ready(function(){$(".list-inline.product-color li").click(function(){var t=$(this).find("input").attr("value"),i=$(this).attr("title");$(".image").attr("value",t),$(".product-color-text").html(i)})});