namespace TypingSpeedTest.Models
{
    public class TypingModel
    {
        public string GivenText { get; set; }
        public string TypedText { get; set; }
        public int WPM { get; set; }
        public double Accuracy { get; set; }
        public int Errors { get; set; }
    }
}
