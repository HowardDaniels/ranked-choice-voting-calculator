$("#add").on("click", function(){
console.log($("#candInput").val());
$("#candidateList").append("<li>" + $("#candInput").val() + "</li>");
});
