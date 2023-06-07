namespace ResponseTime.Models
{
    // Model que determina o retorno do método ResponseTime
    public class ResponseTimeModel
    {
        public string ResponseTime { get; set; }
        public string Url { get; set; }
        public bool Responded { get; set; }
    }
}